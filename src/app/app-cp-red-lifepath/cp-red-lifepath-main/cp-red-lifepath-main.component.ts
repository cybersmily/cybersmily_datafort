import { CPRedLifePathSettings } from './../../shared/cpred/c-p-red-lifepath/models/c-p-red-life-path-settings';
import { CpRedLifepathCoreRoleChartParam } from './../../shared/cpred/c-p-red-lifepath/models/cp-red-lifepath-core-role-chart-param';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { DataService } from './../../shared/services/file-services/data.service';
import { SeoService } from './../../shared/services/seo/seo.service';
import { CPRedCharacterPDFService } from './../../shared/cpred/services/cprcharpdf/c-p-red-character-p-d-f.service';
import { SaveFileService } from './../../shared/services/file-services/save-file.service';
import { CPRedLifePathService } from './../../shared/cpred/c-p-red-lifepath/services/c-p-red-life-path.service';
import { CPRedLifepathJumpStart, CPRedLifePathCore } from './../../shared/cpred/c-p-red-lifepath/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faDice, faCog, faFilePdf, faSave, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cp-red-lifepath-main',
  templateUrl: './cp-red-lifepath-main.component.html',
  styleUrls: ['./cp-red-lifepath-main.component.css']
})
export class CpRedLifepathMainComponent implements OnInit {
  faDice = faDice;
  faCog = faCog;
  faFilePdf = faFilePdf;
  faSave = faSave;
  faRedo = faRedo;
  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };
  settingsKey: string = 'cpredLifePathSettings';

  jumpstartLifepath: CPRedLifepathJumpStart = new CPRedLifepathJumpStart();
  coreLifePath: CPRedLifePathCore = new CPRedLifePathCore();
  lifePathCharts: any = {};
  parameters: Array<CpRedLifepathCoreRoleChartParam> = new Array<CpRedLifepathCoreRoleChartParam>();
  roleParam: any;

  selectedSystem: string = 'jumpstart';
  selectedRole: string = this.lifepathService.settings.defaultRole;

  roles: Array<string> = [
    'Exec',
    'Fixer',
    'Lawman',
    'Media',
    'Medtech',
    'Netrunner',
    'Nomad',
    'Rockerboy',
    'Solo',
    'Tech'
  ];

  systems: Array<string>;

  constructor(private modalService: BsModalService,
    private lifepathService: CPRedLifePathService,
    private dataService: DataService,
    private saveFileService: SaveFileService,
    private pdfService: CPRedCharacterPDFService,
    private seo: SeoService
    ) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'Lifepath Generator for Cyberpunk Red',
      '2021-07, Cybersmily\'s Datafort Lifepath Generator for Cyberpunk Red is an unoffical application to generate a lifepath.'
    );
    this.dataService.GetJson(JsonDataFiles.CPRED_LIFEPATH_CHART_JSON)
    .subscribe( data => {
      this.lifePathCharts = data;
      this.lifepathService.settings = this.loadSettings();
      this.selectedRole = this.lifepathService.settings.defaultRole;
      this.changeRole();
      this.selectedSystem = this.lifepathService.settings.defaultSystem;
    });
  }

  changeSystem() {
    this.selectedRole = this.lifepathService.settings.defaultRole;
    this.parameters = new Array<CpRedLifepathCoreRoleChartParam>();
    this.roleParam = undefined;
  }

  changeRole() {
    const roleChart = this.lifePathCharts.corebook.roles.filter(r => r.role === this.selectedRole)[0];
    if(roleChart && roleChart.param) {
      this.roleParam = {};
      this.parameters = roleChart.param;
      this.parameters.forEach( p => {
        if (p.options) {
          this.roleParam[p.name] = p.options[0];
        } else {
          this.roleParam[p.name] = false;
        }
      })
    } else {
      this.parameters = new Array<CpRedLifepathCoreRoleChartParam>();
      this.roleParam = undefined;
    }
  }

  generate() {
    switch(this.selectedSystem) {
      case 'jumpstart':
        this.jumpstartLifepath = this.lifepathService.generateJumpStart(this.lifePathCharts.jumpstart);
        return;
      default:
        this.coreLifePath = this.lifepathService.generateCore(this.lifePathCharts.corebook, this.selectedRole, this.roleParam);
    }
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  changeSettings() {
    this.storeSettings(this.lifepathService.settings);
  }


  saveFile() {
    if( this.selectedSystem === 'jumpstart') {
      this.saveFileService.SaveAsFile( 'CPRedJumpkitLifepath', this.jumpstartLifepath.print());
    } else if( this.selectedSystem === 'corebook') {
      this.saveFileService.SaveAsFile( 'CPRedCoreLifepath', this.coreLifePath.print());
    }
  }

  saveAsPDF() {
    if( this.selectedSystem === 'jumpstart') {
      this.pdfService.generateLifePathJumpStartPDF(this.jumpstartLifepath);
    } else if( this.selectedSystem === 'corebook') {
      this.pdfService.generateLifePathCorePDF(this.coreLifePath);
    }
  }

  storeSettings(settings:CPRedLifePathSettings) {
    window.localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }

  loadSettings(): CPRedLifePathSettings {
    let settings = JSON.parse(window.localStorage.getItem(this.settingsKey));
    return settings || new CPRedLifePathSettings();
  }

  resetSettings() {
    this.lifepathService.settings = new CPRedLifePathSettings();
    this.storeSettings(this.lifepathService.settings);
  }

}
