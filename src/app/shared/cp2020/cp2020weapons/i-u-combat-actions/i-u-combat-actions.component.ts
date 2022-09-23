import { Cp2020StatBlock } from './../../cp2020-stats/models';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Cp2020PlayerSkill } from '../../cp2020-skills/models';

@Component({
  selector: 'cs-i-u-combat-actions',
  templateUrl: './i-u-combat-actions.component.html',
  styleUrls: ['./i-u-combat-actions.component.css'],
})
export class IUCombatActionsComponent implements OnInit, OnChanges {
  @Input()
  stats: Cp2020StatBlock = new Cp2020StatBlock();

  @Input()
  combatSense: Cp2020PlayerSkill = new Cp2020PlayerSkill();

  @Input()
  skills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  initMod: number = 0;
  combatSkills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  get reactionTotal(): number {
    return (
      this.stats.REF.Adjusted +
      this.combatSense.value +
      this.initMod +
      this.initiativeSkill
    );
  }

  get initiativeSkill(): number {
    return (
      this.skills.find((sk) => sk.name.toLowerCase() === 'initiative')?.value ||
      0
    );
  }

  constructor() {}

  ngOnInit(): void {
    this.setCombatSkills();
  }

  ngOnChanges(): void {
    this.setCombatSkills();
  }

  private setCombatSkills(): void {
    this.combatSkills = this.skills
      .filter((sk) => !sk.name.toLowerCase().startsWith('init'))
      .sort((a, b) =>
        (a.option ? a.option : a.name) > (b.option ? b.option : b.name) ? 1 : -1
      );
  }

  getQuickAction(value: number) {
    const ret = Math.floor(value / 5);
    return ret < 1 ? 1 : ret;
  }

  getNormalAction(value: number) {
    const ret = Math.floor(value / 10);
    return ret < 1 ? 1 : ret;
  }

  getFullAction(value: number) {
    const ret = Math.floor(value / 15);
    return ret < 1 ? 1 : ret;
  }

  getColumn(column: number): Array<Cp2020PlayerSkill> {
    switch (column) {
      case 1:
        return this.combatSkills.slice(
          0,
          Math.ceil(this.combatSkills.length / 2)
        );
      case 2:
        return this.combatSkills.slice(Math.ceil(this.combatSkills.length / 2));
      default:
        return this.combatSkills;
    }
  }
}
