import { Cp2020PlayerSkill } from './../../../cp2020-skills/models/cp2020-player-skill';
import { DiceRolls } from './../../../../models/dice-rolls';
import { DiceService } from './../../../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { Cp2020HagglingService } from './cp2020-haggling.service';

describe('Cp2020HagglingService', () => {
  let service: Cp2020HagglingService;
  let diceService: DiceService;
  let diceRoll: DiceRolls;
  let playerStreetdeal: Cp2020PlayerSkill;
  let playerStreetwise: Cp2020PlayerSkill;
  let cool: number;
  let streetwise: string = 'Streetwise';
  let streetdeal: string = 'Streetdeal';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService],
    });
    diceService = new DiceService();
    service = new Cp2020HagglingService(diceService);
    diceRoll = new DiceRolls();
    diceRoll.rolls.push(5);
    spyOn(diceService, 'rollCP2020D10').and.returnValue(diceRoll);
    playerStreetdeal = new Cp2020PlayerSkill({ name: streetdeal, value: 7 });
    playerStreetwise = new Cp2020PlayerSkill({ name: streetwise, value: 7 });
    cool = 8;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Results should be 2% difference', () => {
    it('should be 2% for streetdeal', () => {
      const playerTotal = 20; // cool 8 + skill 7 + die roll 5
      const targetTotal = 15;
      const expected = 1 + (targetTotal - playerTotal) * 0.02;

      const result = service.calculateHaggleModifier(
        playerStreetdeal,
        cool,
        'Streetdeal',
        10
      );
      expect(result).toEqual(expected);
    });

    it('should be 2% for streetwise', () => {
      const playerTotal = 20; // cool 8 + skill 7 + die roll 5
      const targetTotal = 15;
      const expected = 1 + (targetTotal - playerTotal) * 0.02;

      const result = service.calculateHaggleModifier(
        playerStreetwise,
        cool,
        'Streetwise',
        10
      );
      expect(result).toEqual(expected);
    });

    it('should be 2% for streetwise vs null', () => {
      let playerTotal = 20; // cool 8 + skill 7 + die roll 5
      let targetTotal = 15;
      let expected = 1 + (targetTotal - playerTotal) * 0.02;

      let result = service.calculateHaggleModifier(
        playerStreetwise,
        cool,
        null,
        10
      );
      expect(result).toEqual(expected);

      playerTotal = 13; // cool 8 + no skill + die roll 5
      expected = 1 + (targetTotal - playerTotal) * 0.02;

      result = service.calculateHaggleModifier(null, cool, 'Streetwise', 10);
      expect(result).toEqual(expected);
    });
  });

  describe('Results should be 5% difference', () => {
    it('should be 5% for player streetdeal vs target', () => {
      const playerTotal = 20; // cool 8 + skill 7 + die roll 5
      const targetTotal = 15;
      const expected = 1 + (targetTotal - playerTotal) * 0.05;

      let result = service.calculateHaggleModifier(
        playerStreetdeal,
        cool,
        'Streetwise',
        10
      );
      expect(result).toEqual(expected);

      result = service.calculateHaggleModifier(
        playerStreetdeal,
        cool,
        null,
        10
      );
      expect(result).toEqual(expected);
    });

    it('should be 5% for player streetwise/null vs target streetdeal', () => {
      let playerTotal = 20; // cool 8 + skill 7 + die roll 5
      const targetTotal = 15;
      let expected = 1 + (targetTotal - playerTotal) * 0.05;

      let result = service.calculateHaggleModifier(
        playerStreetwise,
        cool,
        'Streetdeal',
        10
      );
      expect(result).toEqual(expected);

      playerTotal = 13; // cool 8 + no skill + die roll 5
      expected = 1 + (targetTotal - playerTotal) * 0.05;
      result = service.calculateHaggleModifier(null, cool, 'Streetdeal', 10);
      expect(result).toEqual(expected);
    });
  });
});
