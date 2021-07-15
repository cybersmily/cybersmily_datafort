import { SeoService } from './../../shared/services/seo/seo.service';
import { CPRedCharacterPDFService } from './../../shared/cpred/services/cprcharpdf/c-p-red-character-p-d-f.service';
import { SaveFileService } from './../../shared/services/file-services/save-file.service';
import { Subscriber } from 'rxjs';
import { CPRedLifePathService } from './../../shared/cpred/services/cpredlifepath/c-p-red-life-path.service';
import { CpRedLifepathCore } from './../../shared/cpred/models/cp-red-lifepath-core';
import { CPRedLifepathJumpStart } from './../../shared/cpred/models/cp-red-lifepath-js';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faDice, faCog, faFilePdf, faSave } from '@fortawesome/free-solid-svg-icons';
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
  modalRef: BsModalRef;
  modalConfig = {};

  jumpstartLifepath: CPRedLifepathJumpStart = new CPRedLifepathJumpStart();
  coreLifePath: CpRedLifepathCore = new CpRedLifepathCore();

  selectedSystem: string = 'jumpstart';
  selectedRole: string = '';

  constructor(private modalService: BsModalService,
    private lifepathService: CPRedLifePathService,
    private saveFileService: SaveFileService,
    private pdfService: CPRedCharacterPDFService,
    private seo: SeoService
    ) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'Lifepath Generator for Cyberpunk Red',
      '2021-07, Cybersmily\'s Datafort Lifepath Generator for Cyberpunk Red is an unoffical application to generate a lifepath.'
    );
  }

  generate() {
    this.lifepathService.generateJumpStart()
    .subscribe(data => this.jumpstartLifepath = data);
    this.lifepathService.generateCore(this.selectedRole)
    .subscribe(data => this.coreLifePath = data);
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }


  saveFile() {
    if( this.selectedSystem === 'jumpstart') {
      this.saveFileService.SaveAsFile( 'CPRedJumpkitLifepath', this.jumpstartLifepath.print());
    }
  }

  saveAsPDF() {
    if( this.selectedSystem === 'jumpstart') {
      this.pdfService.generateLifePahtPDF(this.jumpstartLifepath);
    }
  }

}
