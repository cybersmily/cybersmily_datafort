import { faDice } from '@fortawesome/free-solid-svg-icons';
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

  constructor() {}

  ngOnInit() {
  }

  onChangeSkill(skill?:Cp2020PlayerSkill) {

    if(skill) {
      this.skills.editSkill(skill);
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
