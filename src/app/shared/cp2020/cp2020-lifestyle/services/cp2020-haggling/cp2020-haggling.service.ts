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
   * @return {*}  {number} - percentage
   * @memberof Cp2020HagglingService
   */
  calculateHaggleModifier(
    skill: Cp2020PlayerSkill,
    cool: number,
    targetSkill: string,
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
      skill.name.toLowerCase() === targetSkill.toLowerCase() ? 2 : 5;

    const difference = (targetResult - characterResult) * modifier;
    const value = 100 + difference;

    if (value >= 50 && value <= 150) {
      return value;
    } else if (value < 50) {
      return 50;
    }
    return 150;
  }
}
