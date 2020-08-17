import { CpPlayerWeaponList } from './../../shared/models/weapon/cp-player-weapon-list';
import { CmbtTrckOpponent, CmbtTrckOppSelection, CmbtTrckTemplate } from '../../shared/models/cmbt-trck';
import { OppTemplateService } from './../services/opp-template.service';
import { OppCyberware } from './../../shared/models/cyberware';
import { DataSkill } from './../../shared/models/data/data-skill';
import { Cp2020ArmorBlock, Cp2020ArmorLayer, Cp2020Role, Cp2020PlayerSkill, Cp2020StatBlock} from './../../shared/models/cp2020character';
import { SkillListService } from './../../shared/services/data/skill-list.service';
import { DataService } from './../../shared/services/data.service';
import { Cp2020RolesDataService } from './../../shared/services/chargen/cp2020-roles-data.service';
import { forkJoin } from 'rxjs';
import { faDice, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeapon } from './../../shared/models/weapon';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-opponent-card',
  templateUrl: './cmbt-trck-opponent-card.component.html',
  styleUrls: ['./cmbt-trck-opponent-card.component.css']
})
export class CmbtTrckOpponentCardComponent implements OnInit, OnChanges {
  dice = faDice;
  faTrash = faTrash;

  customClass = 'opp-section';

  @Input()
  opponent = new CmbtTrckOpponent();

  @Input()
  index: number;

  @Output()
  updateOpponent = new EventEmitter<CmbtTrckOppSelection>();

  selectedTemplate = null;
  templates = new Array<CmbtTrckTemplate>();
  selectedRole: Cp2020Role = null;
  roles: Array<Cp2020Role> = new Array<Cp2020Role>();
  skills: Array<DataSkill> = new Array<DataSkill>();

  constructor(private data: DataService,
    private roleService: Cp2020RolesDataService,
    private skillListService: SkillListService,
    private oppTemplateService: OppTemplateService
    ) { }

  ngOnInit() {
    const templates = this.oppTemplateService.TemplateList;
    const rolesList = this.roleService.getRoles();
    const skillList = this.skillListService.Skills;
    forkJoin([
      templates,
      rolesList,
      skillList
    ]).subscribe( results => {
      this.templates = results[0];
      this.roles = results[1];
      this.skills = results[2];
    });
  }

  ngOnChanges() {
    this.selectedTemplate = null;
    this.selectedRole = null;
  }

  onStatBlockChange(value: Cp2020StatBlock) {
    this.opponent.stats = value;
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }

  changeTemplate() {
    this.oppTemplateService.getTemplate(this.selectedTemplate)
    .subscribe( template => {
      this.opponent.importTemplate(template);
      this.selectedRole = this.roles.find( r => r.name === this.opponent.role);
      this.updateOpponent.emit({index: this.index, opponent: this.opponent});
    });
  }

  changeWeapons(wpns: CpPlayerWeaponList) {
    if (!wpns) {
      return;
    }
    this.opponent.weapons = wpns.items;
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }

  changeArmor(armor: Cp2020ArmorBlock) {
    this.opponent.armor = armor;
    this.opponent.stats.REF.ev = this.opponent.armor.ev;
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }

  changeOpponent(opp?: CmbtTrckOpponent) {
    if (opp) {
      this.opponent = opp;
    }
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }

  changeCyber(cyber: Array<OppCyberware>) {
    this.opponent.cyberware = cyber;
    // add any armor to as layers
    this.opponent.cyberware.filter( c => c.armor)
    .forEach( c => {
      const a = new Cp2020ArmorLayer(c.armor);
      a.name = c.name;
      a.isActive = true;
      a.isSkinWeave = c.name.toLowerCase().includes('skinweave');
      this.opponent.armor.addLayer(a);
    });
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }

  changeGear(gear: Array<string>) {
    this.opponent.gear = gear;
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }

  changeRole() {
    this.opponent.role = this.selectedRole.name;
    this.opponent.sa = new Cp2020PlayerSkill(this.selectedRole.specialability);
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
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }

  clear() {
    this.opponent = new CmbtTrckOpponent();
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }

  private addSkill(name: string, choice?: boolean) {
    const found = this.skills.find( skill => skill.name.toLowerCase() === name.toLowerCase());
    if (found) {
      this.opponent.addSkill( new Cp2020PlayerSkill({ name: found.name, stat: found.stat, value: 0, roleskill: true, ischoice: choice}));
    }
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }

  deleteRole() {
    this.opponent.role = '';
    this.updateOpponent.emit({index: this.index, opponent: this.opponent});
  }
}
