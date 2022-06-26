import { DiceRolls } from './../../../../models/dice-rolls';
import { DiceService } from './../../../../services/dice/dice.service';
import { CpRedCharacterSkill } from './../../models/cp-red-character-skill';
import { CpRedCharacterStat } from './../../../c-p-red-stats/models/cp-red-character-stat';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-skill-dice-roll',
  templateUrl: './cp-red-skill-dice-roll.component.html',
  styleUrls: ['./cp-red-skill-dice-roll.component.css'],
})
export class CpRedSkillDiceRollComponent implements OnInit {
  faDice = faDice;

  dieRoll: DiceRolls = new DiceRolls();

  @Input()
  stat: CpRedCharacterStat = new CpRedCharacterStat();

  @Input()
  skill: CpRedCharacterSkill = new CpRedCharacterSkill();

  constructor(private dice: DiceService) {}

  ngOnInit(): void {}

  rollDice(): void {
    this.dieRoll = this.dice.rollCPRedD10();
  }
}
