import { CmbtTrckThreatLevelService } from './../services/cmbt-trck-threat-level.service';
import { CmbtTrckOppThreatCode } from './../../shared/models/cmbt-trck/cmbt-trck-opp-threat-code';
import { Cp2020Role } from './../../shared/cp2020/cp2020-role/models';
import { Cp2020StatBlock } from './../../shared/cp2020/cp2020-stats/models/cp2020-stat-block';
import { Cp2020ArmorPiece, Cp2020ArmorBlock } from './../../shared/cp2020/cp2020-armor/models';
import { OppCyberware } from './../../shared/cp2020/cp2020-cyberware/models';
import { CpPlayerWeaponList, CpPlayerWeapon } from './../../shared/cp2020/cp2020weapons/models';
import { OpponentTrackerService } from './../services/opponent-tracker.service';
import { CmbtTrckOpponent,  CmbtTrckTemplate } from '../../shared/models/cmbt-trck';
import { OppTemplateService } from './../services/opp-template.service';
import { DataSkill, Cp2020PlayerSkill } from './../../shared/cp2020/cp2020-skills/models';
import { SkillListService } from './../../shared/cp2020/cp2020-skills/services';
import { DataService } from './../../shared/services/file-services';
import { Cp2020RolesDataService } from './../../shared/cp2020/cp2020-role/services/cp2020-roles-data.service';
import { forkJoin } from 'rxjs';
import { faDice, faTrash, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-opponent-card',
  templateUrl: './cmbt-trck-opponent-card.component.html',
  styleUrls: ['./cmbt-trck-opponent-card.component.css']
})
export class CmbtTrckOpponentCardComponent implements OnInit, OnChanges {
  dice = faDice;
  faTrash = faTrash;
  faRedo = faRedo;

  currThreatLevel: CmbtTrckOppThreatCode = new CmbtTrckOppThreatCode();

  customClass = 'opp-section';
  currOpponent = new CmbtTrckOpponent();

  @Input()
  opponent = new CmbtTrckOpponent();

  @Input()
  index: number;

  selectedTemplate = null;
  templates = new Array<CmbtTrckTemplate>();
  selectedRole: Cp2020Role = null;
  roles: Array<Cp2020Role> = new Array<Cp2020Role>();
  skills: Array<DataSkill> = new Array<DataSkill>();

  constructor(private data: DataService,
    private roleService: Cp2020RolesDataService,
    private skillListService: SkillListService,
    private oppTemplateService: OppTemplateService,
    private opponentService: OpponentTrackerService,
    private threatCodeService: CmbtTrckThreatLevelService
    ) { }

  ngOnInit() {
    const templates = this.oppTemplateService.TemplateList;
    const rolesList = this.roleService.getRoles();
    const skillList = this.skillListService.Skills;
    const opponents = this.opponentService.opponents;
    this.currOpponent = new CmbtTrckOpponent(this.opponent);
    forkJoin([
      templates
      , rolesList
      , skillList
    ]).subscribe( results => {
      this.templates = results[0];
      this.roles = results[1];
      this.skills = results[2];
    }, err => {
      console.log(err);
    }
    );
  }

  get enableThreatCode(): boolean {
    return this.currThreatLevel.armor !== '' && this.currThreatLevel.weapon > 0 && this.currThreatLevel.skill !== '';
  }

  ngOnChanges() {
    this.selectedTemplate = null;
    this.selectedRole = null;
    this.currOpponent = new CmbtTrckOpponent(this.opponent);
  }

  onStatBlockChange(value: Cp2020StatBlock) {
    this.currOpponent.stats.import(value);
    this.opponentService.changeOpponent(this.currOpponent);
  }


  woundOpponent(value: number) {
    this.opponentService.woundOpponent(this.currOpponent, value);
  }

  changeTemplate() {
    this.oppTemplateService.getTemplate(this.selectedTemplate)
    .subscribe( template => {
      this.currOpponent.importTemplate(template);
      this.selectedRole = this.roles.find( r => r.name === this.currOpponent.role);
      this.updateOpponent();
    });
  }

  changeWeapons(wpns: CpPlayerWeaponList) {
    if (!wpns) {
      return;
    }
    this.currOpponent.weapons = wpns.items.map(wpn => new CpPlayerWeapon(wpn));
    this.updateOpponent();
  }

  changeArmor(armor: Cp2020ArmorBlock) {
    this.currOpponent.armor = new Cp2020ArmorBlock(armor);
    this.currOpponent.stats.REF.ev = this.currOpponent.armor.ev;
    this.updateOpponent();
  }

  changeOpponent(opp?: CmbtTrckOpponent) {
    if (opp) {
      this.currOpponent = opp;
    }
    this.updateOpponent();
  }

  changeCyber(cyber: Array<OppCyberware>) {
    this.currOpponent.cyberware = cyber;
    // add any armor to as layers
    this.currOpponent.cyberware.filter( c => c.armor)
    .forEach( c => {
      const a = new Cp2020ArmorPiece(c.armor);
      a.name = c.name;
      a.isActive = true;
      a.isSkinWeave = c.name.toLowerCase().includes('skinweave');
      this.currOpponent.armor.addPiece(a);
    });
    this.updateOpponent();
  }

  changeGear(gear: Array<string>) {
    this.currOpponent.gear = gear;
    this.updateOpponent();
  }

  changeRole() {
    this.currOpponent.role = this.selectedRole.name;
    this.currOpponent.sa = new Cp2020PlayerSkill(this.selectedRole.specialability);
    this.selectedRole.skills.forEach( sk => {
      if (typeof sk === 'string') {
        // resolve ampersand in JSON file.
        sk = sk.replace('\\&', '&');
        this.addSkill(sk);
      }
      if (Array.isArray(sk)) {
        sk.forEach( s => {
          this.addSkill(s, true);
        });
      }
    });
    this.updateOpponent();
  }

  setOpponentThreatLevelAttributes($event) {
    if($event.target.checked) {
      this.threatCodeService
      .generate(this.currThreatLevel)
      .subscribe( opp => {
        this.currOpponent = new CmbtTrckOpponent(opp);
      });
    }

  }

  clear() {
    this.currOpponent = new CmbtTrckOpponent();
    this.opponent = new CmbtTrckOpponent();
    this.updateOpponent();
  }

  private addSkill(name: string, choice?: boolean) {
    const found = this.skills.find( skill => skill.name.toLowerCase() === name.toLowerCase());
    if (found) {
      this.currOpponent.addSkill(new Cp2020PlayerSkill({
        name: found.name,
        stat: found.stat,
        value: 0,
        roleskill: true,
        ischoice: choice
      }));
    }
    this.updateOpponent();
  }

  private updateOpponent() {
    this.opponentService.changeOpponent(this.currOpponent);
  }

  deleteRole() {
    this.currOpponent.role = '';
    this.updateOpponent();
  }
}
