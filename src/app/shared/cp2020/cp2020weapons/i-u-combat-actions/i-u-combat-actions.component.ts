import { Cp2020StatBlock } from './../../cp2020-stats/models';
import { Component, Input, OnInit } from '@angular/core';
import { Cp2020PlayerSkill } from '../../cp2020-skills/models';

@Component({
  selector: 'cs-i-u-combat-actions',
  templateUrl: './i-u-combat-actions.component.html',
  styleUrls: ['./i-u-combat-actions.component.css']
})
export class IUCombatActionsComponent implements OnInit {

  @Input()
  stats: Cp2020StatBlock = new Cp2020StatBlock();

  @Input()
  combatSense: Cp2020PlayerSkill = new Cp2020PlayerSkill();

  @Input()
  skills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  initMod: number = 0;

  get reactionTotal(): number {
    return this.stats.REF.Adjusted + this.combatSense.value + this.initMod;
  }

  constructor() { }

  ngOnInit(): void {
    console.log('iu oninit', this.skills, this.stats.REF, this.combatSense);
  }

  getQuickAction(value: number) {
    return Math.ceil(value/5);
  }

  getNormalAction(value: number) {
    return Math.ceil(value/10);
  }

  getFullAction(value: number) {
    return Math.ceil(value/15);
  }
}
