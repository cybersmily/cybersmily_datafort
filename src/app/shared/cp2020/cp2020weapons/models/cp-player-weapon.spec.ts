import { DiceRolls } from './../../../models/dice-rolls';
import { DiceService } from './../../../services/dice/dice.service';

import { CpPlayerWeapon } from './';

describe('CpPlayerWeapon', () => {
  let dice: DiceService;
  let testWeapon: CpPlayerWeapon;
  let diceRoll: DiceRolls;

  beforeEach(() => {
    dice = new DiceService();
    testWeapon = new CpPlayerWeapon({
      name: 'test1',
      type: 'P',
      wa: 2,
      conc: 'J',
      avail: 'P',
      damage: '2d6',
      shots: 10,
      rof: 1,
      rel: 'ST',
      cost: 100,
      jammed: false,
      notes: '',
      range: 50,
      source: { book: 'Cp2020', page: 50 },
    });
    diceRoll = new DiceRolls();
    diceRoll.rolls.push(10);
    diceRoll.rolls.push(1);
    diceRoll.total = 11;
  });

  afterEach(() => {
    dice = null;
    testWeapon = null;
    diceRoll = null;
  });

  it('should be created', () => {
    expect(testWeapon).toBeTruthy();
  });

  it('should be create from params', () => {
    expect(testWeapon).toBeTruthy('weaopn not successfully created.');
    expect(testWeapon.name).toEqual('test1', 'name was not set.');
    expect(testWeapon.wa).toEqual(2, 'weapon accuracy was not set.');
    expect(testWeapon.damage).toEqual('2d6', 'damage was not set.');
    expect(testWeapon.cost).toEqual(100, 'cost was not set.');
    expect(testWeapon.source.book).toEqual('Cp2020', 'source was not set.');
    expect(testWeapon.source.page).toEqual(50, 'page was not set.');
  });

  describe('checkReliability', () => {
    it('should checkReliability is not jammed', () => {
      const result = testWeapon.checkReliability(dice);
      expect(result).not.toEqual('rdeeeeeeee');
    });
    it('should checkReliability is jammed', () => {
      spyOn(dice, 'generateNumber').and.returnValue(1);
      const result = testWeapon.checkReliability(dice);
      expect(result).toContain('jammed');
      expect(result).toContain('1');
    });

    it('should checkReliability is not jammed', () => {
      spyOn(dice, 'generateNumber').and.returnValue(10);
      const result = testWeapon.checkReliability(dice);
      expect(result).not.toContain('jammed');
    });
  });

  describe('rollLocation', () => {
    it('should roll head', () => {
      spyOn(dice, 'generateNumber').and.returnValue(1);
      expect(testWeapon.rollLocation(dice)).toEqual('Head');
    });
    it('should roll torso', () => {
      spyOn(dice, 'generateNumber').and.returnValue(3);
      expect(testWeapon.rollLocation(dice)).toEqual('Torso');
    });
    it('should roll leg', () => {
      spyOn(dice, 'generateNumber').and.returnValue(8);
      expect(testWeapon.rollLocation(dice)).toContain('Leg');
    });
    it('should roll arm', () => {
      spyOn(dice, 'generateNumber').and.returnValue(5);
      expect(testWeapon.rollLocation(dice)).toContain('Arm');
    });
  });

  describe('getRangeBracket', () => {
    it('should return point blank range', () => {
      const range = testWeapon.getRangeBracket(1);
      expect(range.bracket.toLowerCase()).toEqual('point blank');
      expect(range.diff).toEqual(10);
    });
    it('should return close range', () => {
      const range = testWeapon.getRangeBracket(12);
      expect(range.bracket.toLowerCase()).toEqual('close');
      expect(range.diff).toEqual(15);
    });
    it('should return medium range', () => {
      const range = testWeapon.getRangeBracket(25);
      expect(range.bracket.toLowerCase()).toEqual('medium');
      expect(range.diff).toEqual(20);
    });
    it('should return long range', () => {
      const range = testWeapon.getRangeBracket(50);
      expect(range.bracket.toLowerCase()).toEqual('long');
      expect(range.diff).toEqual(25);
    });
    it('should return extreme range', () => {
      const range = testWeapon.getRangeBracket(100);
      expect(range.bracket.toLowerCase()).toEqual('extreme');
      expect(range.diff).toEqual(30);
    });
    it('should return out of range', () => {
      const range = testWeapon.getRangeBracket(101);
      expect(range.bracket.toLowerCase()).toEqual('out of range');
      expect(range.diff).toEqual(0);
    });
  });

  describe('Empty', () => {
    it('should be not be empty initially', () => {
      expect(testWeapon.isEmpty).toBeFalsy();
    });

    it('should be empty', () => {
      testWeapon.expendShot(9);
      expect(testWeapon.isEmpty).toBeTruthy();
    });

    it('should be able to reload', () => {
      testWeapon.expendShot(9);
      expect(testWeapon.currMag.used).toEqual(10);
      expect(testWeapon.isEmpty).toBeTruthy();
      testWeapon.reload();
      expect(testWeapon.currMagIndex).toEqual(0);
      expect(testWeapon.currMag.used).toEqual(0);
      expect(testWeapon.isEmpty).toBeFalsy();
    });
  });

  describe('fire', () => {
    it('should calculate to-hit', () => {
      const results = testWeapon.toHitCalulation(5, 5);
      expect(results).not.toBeUndefined();
      expect(results.total).toEqual(12);
      expect(results.results).toEqual('5(stat) + 5(skill) + 2(wa) = 12');
    });

    it('should fire with results', () => {
      const roll = new DiceRolls();
      roll.rolls.push(5);
      roll.total = 5;
      spyOn(dice, 'rollCP2020D10').and.returnValue(roll);
      const results = testWeapon.fire(dice, 5, 5);
      expect(results).not.toBeUndefined();
      expect(results).toContain('5 [Dice: (5)]');
      expect(results).toContain(' = 17');
    });

    it('should fire with fumble result', () => {
      const roll = new DiceRolls();
      roll.rolls.push(1);
      roll.total = 1;
      spyOn(dice, 'rollCP2020D10').and.returnValue(roll);
      const results = testWeapon.fire(dice, 5, 5);
      expect(results).not.toBeUndefined();
      expect(results.toLowerCase()).toContain('fumble');
    });

    it('should fire with critical result', () => {
      spyOn(dice, 'rollCP2020D10').and.returnValue(diceRoll);
      const results = testWeapon.fire(dice, 5, 5);
      expect(results).not.toBeUndefined();
      expect(results.toLowerCase()).toContain('critical');
    });
  });

  describe('rollDamage', () => {
    it('should roll damage', () => {
      const results = testWeapon.rollDamage(dice);
      expect(results.length).toEqual(1);
      expect(results[0]).not.toBeUndefined();
      expect(results[0]).toContain(' to ');
    });

    it('should roll 11 damage', () => {
      spyOn(dice, 'rollMoreDice').and.returnValue(diceRoll);
      const results = testWeapon.rollDamage(dice);
      expect(results[0]).toContain('11 [Dice: (10, 1)]');
      expect(results[0]).toContain('= 11');
    });

    it('should roll multiple damage', () => {
      spyOn(dice, 'rollMoreDice').and.returnValue(diceRoll);
      const results = testWeapon.rollDamage(dice, 5);
      expect(results.length).toEqual(5);
      results.forEach((r) => {
        expect(r).toContain('11 [Dice: (10, 1)]= 11 to ');
      });
    });

    it('should not add body modifier', () => {
      testWeapon.type = 'P';
      spyOn(dice, 'rollMoreDice').and.returnValue(diceRoll);
      const results = testWeapon.rollDamage(dice, 1, 3);
      expect(results[0]).not.toContain('(BOD Mod)');
    });

    it('should add body modifier', () => {
      testWeapon.type = 'MEL';
      spyOn(dice, 'rollMoreDice').and.returnValue(diceRoll);
      const results = testWeapon.rollDamage(dice, 1, 3);
      expect(results[0]).toContain( '+ 3(BOD Mod)');
    });
  });
});
