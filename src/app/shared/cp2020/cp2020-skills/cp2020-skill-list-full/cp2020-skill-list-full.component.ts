import { CpPlayerWeapon } from './../../cp2020weapons/models/cp-player-weapon';
import { faDice, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkill, Cp2020PlayerSkills } from './../models';
import { Cp2020PlayerRole } from './../../../models/cp2020character/cp2020-player-role';
import { Cp2020StatBlock } from '../../cp2020-stats/models/cp2020-stat-block';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-skill-list-full',
  templateUrl: './cp2020-skill-list-full.component.html',
  styleUrls: ['./cp2020-skill-list-full.component.css']
})
export class Cp2020SkillListFullComponent implements OnInit {
  faDice = faDice;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  isCollapsed = false;

  get collapseChevron(): any {
    return (this.isCollapsed)? this.faChevronRight : this.faChevronDown;
  }

  @Input()
  role =  new Cp2020PlayerRole();

  @Input()
  stats = new Cp2020StatBlock();

  @Input()
  skills = new Cp2020PlayerSkills();

  @Output()
  changeSpecialAblity = new EventEmitter<Cp2020PlayerRole>();

  @Output()
  changeSKills = new EventEmitter<Cp2020PlayerSkills>();

  skillTotals = { role: {}, other: {}};

  get specialAbilities(): Array<Cp2020PlayerSkill> {
    const sa = new Array<Cp2020PlayerSkill>(...this.skills.specialAbilites).filter(sk => sk.name.toLowerCase() !== this.role.specialAbility.name.toLowerCase());
    if(this.role.specialAbility && this.role.specialAbility.name !== '') {
      sa.unshift(this.role.specialAbility);
    }
    return sa;
  }

  constructor() {}

  ngOnInit() {
  }

  onChangeSkill(skill?:Cp2020PlayerSkill) {
    if(skill) {
      if (skill.name === this.role.specialAbility.name) {
        this.role.specialAbility = new Cp2020PlayerSkill(skill);
        this.changeSpecialAblity.emit(this.role);
      } else {
        this.skills.editSkill(skill);
      }
    }
    this.changeSKills.emit(this.skills);
  }

  onChangeSpecialAbility() {
    this.changeSpecialAblity.emit(this.role);
  }

  onNewSkill(skill: Cp2020PlayerSkill) {
    this.skills.addSkill(skill);
    this.onChangeSkill();
  }

  onDeleteSkill(skill:Cp2020PlayerSkill) {
    this.skills.deleteSkill(skill);
    this.onChangeSkill();
  }

}
