import { DiceService } from './../../../../services/dice/dice.service';
import { Cp2020PlayerSkill } from './../../../cp2020-skills/models/cp2020-player-skill';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020HagglingService {
  constructor(private diceService: DiceService) {}

  /**
   * calculateHaggleModifier will retrun the multiplier. This multiplier
   * should be applied to the goods/services that is being haggled over.
   *
   * @param {Cp2020PlayerSkill} skill - Player's skill
   * @param {number} cool - Player's COOL stat
   * @param {string} targetSkill - Target's skill used to haggle
   * @param {number} targetValue - total value of target's skill rank + COOL stat.
   * @return {*}  {number} - multiplier to apply to cost of goods/services
   * @memberof Cp2020HagglingService
   */
  calculateHaggleModifier(
    skill: Cp2020PlayerSkill,
    cool: number,
    targetSkill: 'Streetwise' | 'Streetdeal',
    targetValue: number
  ): number {
    skill = skill ?? new Cp2020PlayerSkill({ name: 'Streetwise', value: 0 });
    targetSkill = targetSkill ?? 'Streetwise';
    const characterResult =
      this.diceService.rollCP2020D10().total +
      skill.value +
      skill.totalModifiers +
      cool;
    const targetResult = this.diceService.rollCP2020D10().total + targetValue;
    // get the modifier
    const modifier =
      skill.name.toLowerCase() === targetSkill.toLowerCase() ? 0.02 : 0.05;

    const difference = (targetResult - characterResult) * modifier;
    const value = 1 + difference;

    if (value >= 0.5 && value <= 1.5) {
      return value;
    } else if (value < 0.5) {
      return 0.5;
    }
    return 1.5;
  }
}
