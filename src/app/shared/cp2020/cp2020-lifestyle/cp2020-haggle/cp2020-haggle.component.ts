import { Cp2020HagglingService } from './../services/cp2020-haggling/cp2020-haggling.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cp2020CharacterGeneratorService } from './../../../services/chargen/cp2020-character-generator.service';
import { DiceService } from './../../../services/dice/dice.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Cp2020PlayerSkill } from '../../cp2020-skills/models';

@Component({
  selector: 'cs-cp2020-haggle',
  templateUrl: './cp2020-haggle.component.html',
  styleUrls: ['./cp2020-haggle.component.css'],
})
export class Cp2020HaggleComponent implements OnInit {
  faDice = faDice;

  subscription;

  playerSkills: Array<Cp2020PlayerSkill>;
  cool: number;

  selectedPlayerSkill: Cp2020PlayerSkill = new Cp2020PlayerSkill();
  targetSkillValue: number = 0;
  selectedTargetSkill: string = 'streetwise';
  selectedCost: number;
  playerModifier = 100;
  targetModifier = 100;
  items: Array<number> = [];

  constructor(
    private characterService: Cp2020CharacterGeneratorService,
    private hagglingService: Cp2020HagglingService
  ) {}

  ngOnInit(): void {
    this.subscription = this.characterService.character.subscribe((char) => {
      this.cool = char.stats.COOL.Adjusted;
      this.playerSkills = char.skills.skills.filter(
        (sk) =>
          sk.name.toLowerCase() === 'streetwise' ||
          sk.name.toLowerCase() === 'streetdeal'
      );

      this.selectedPlayerSkill =
        this.playerSkills.find(
          (sk) => sk.name.toLowerCase() === 'streetdeal'
        ) ??
        this.playerSkills.find(
          (sk) => sk.name.toLowerCase() === 'streetwise'
        ) ??
        this.selectedPlayerSkill;
    });
  }

  haggle(): void {
    this.playerModifier = this.hagglingService.calculateHaggleModifier(
      this.selectedPlayerSkill,
      this.cool,
      this.selectedTargetSkill,
      this.targetSkillValue
    );
    this.targetModifier = 200 - this.playerModifier;
  }

  changeCost(): void {
    this.items.push(this.selectedCost);
    this.selectedCost = null;
  }

  calculateCost(cost: number, modifier: number): number {
    return Math.ceil(cost * modifier);
  }

  ngOnDestroy(): void {
    this.subscription.unscribe();
  }
}
