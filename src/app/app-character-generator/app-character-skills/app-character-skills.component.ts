import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkill, Cp2020PlayerSkills } from './../../shared/models/cp2020character';
import { Cp2020PlayerRole } from './../../shared/models/cp2020character/cp2020-player-role';
import { Cp2020StatBlock } from '../../shared/cp2020/cp2020-stats/models/cp2020-stat-block';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-app-character-skills',
  templateUrl: './app-character-skills.component.html',
  styleUrls: ['./app-character-skills.component.css']
})
export class AppCharacterSkillsComponent implements OnInit {
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

  onChangeSkill() {
    this.changeSKills.emit(this.skills);
  }

  onChangeSpecialAbility() {
    this.changeSpecialAblity.emit(this.role);
  }

  getColumnOne(skills: Array<Cp2020PlayerSkill>): Array<Cp2020PlayerSkill> {
    const multi = (skills.length%3 === 0) ? 0.33 : 0.34;
    return skills.slice(0, Math.ceil(skills.length * multi));
  }

  getColumnTwo(skills: Array<Cp2020PlayerSkill>): Array<Cp2020PlayerSkill> {
    const multi = (skills.length%3 === 0) ? 0.33 : 0.34;
    const start = Math.ceil(skills.length * multi);
    const end = Math.ceil(skills.length * 0.33);
    return skills.slice(start, start + end);
  }

  getColumnThree(skills: Array<Cp2020PlayerSkill>): Array<Cp2020PlayerSkill> {
    const multi = (skills.length%3 === 0) ? 0.66 : 0.67;
    return skills.slice(Math.ceil(skills.length * multi));
  }
}
