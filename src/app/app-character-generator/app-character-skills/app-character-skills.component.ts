import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkills } from './../../shared/models/cp2020character/cp2020-player-skills';
import { Cp2020PlayerRole } from './../../shared/models/cp2020character/cp2020-player-role';
import { Cp2020StatBlock } from './../../shared/models/cp2020character/cp2020-stat-block';
import { Cp2020PlayerCyberList } from '../../shared/models/cyberware/cp2020-player-cyber-list';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-app-character-skills',
  templateUrl: './app-character-skills.component.html',
  styleUrls: ['./app-character-skills.component.css']
})
export class AppCharacterSkillsComponent implements OnInit {
  faDice = faDice;

  @Input()
  cyberware = new Cp2020PlayerCyberList(10);

  @Input()
  role =  new Cp2020PlayerRole();

  @Input()
  stats = new Cp2020StatBlock();

  @Input()
  skills = new Cp2020PlayerSkills();

  @Output()
  changeCyberware = new EventEmitter<Cp2020PlayerCyberList>();

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

  onChangeCyber(list: Cp2020PlayerCyberList) {
    this.changeCyberware.emit(list);
  }

}
