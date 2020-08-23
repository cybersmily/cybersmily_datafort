import { DiceRolls } from './../../models/dice-rolls';
import { TestBed, inject } from '@angular/core/testing';

import { DiceService } from './dice.service';

describe('DiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService]
    });
  });

  it('should be created', inject([DiceService], (service: DiceService) => {
    expect(service).toBeTruthy();
  }));

  it('should be 1 roll', inject([DiceService], (service: DiceService) => {
    const dice: DiceRolls = service.rollDice('1');
    expect(dice.total).toBe(1);
    expect(dice.rolls.length).toBe(1);
    expect(dice.rolls[0]).toBe(1);
  }));

  it('should be 2 rolls(1,2) added together', inject([DiceService], (service: DiceService) => {
    const dice: DiceRolls = service.rollDice('1');
    const addDice: DiceRolls = service.rollDice('2');
    dice.add(addDice);
    expect(dice.total).toBe(3);
    expect(dice.rolls.length).toBe(2);
    expect(dice.rolls[0]).toBe(1);
    expect(dice.rolls[1]).toBe(2);
  }));

  it('should be 2 rolls(2,1) subtracted one another',
    inject([DiceService], (service: DiceService) => {
    const dice: DiceRolls = service.rollDice('2');
    const subDice: DiceRolls = service.rollDice('1');
    dice.subtract(subDice);
    expect(dice.total).toBe(1);
    expect(dice.rolls.length).toBe(2);
    expect(dice.rolls[0]).toBe(2);
    expect(dice.rolls[1]).toBe(1);

  }));

  it('should be 1d6 rolled 10 times is between 1 and 6',
  inject([DiceService], (service: DiceService) => {
    let dice: DiceRolls;
    for (let i = 0; i < 10; i++) {
      dice = service.rollDice('1d6');
      expect(dice.total).toBeGreaterThanOrEqual(1);
      expect(dice.total).toBeLessThanOrEqual(6);
      expect(dice.rolls.length).toBe(1);
      expect(dice.rolls[0]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[0]).toBeLessThanOrEqual(6);
    }
  }));

  it('should be 2d10 rolled 10 times are between 2 and 20',
  inject([DiceService], (service: DiceService) => {
    let dice: DiceRolls;
    for (let i = 0; i < 10; i++) {
      dice = service.rollDice('2d10');
      expect(dice.total).toBeGreaterThanOrEqual(2);
      expect(dice.total).toBeLessThanOrEqual(20);
      expect(dice.rolls.length).toBe(2);
      expect(dice.rolls[0]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[0]).toBeLessThanOrEqual(10);
    }
  }));

  it('should be 2d6+3 dice roll between 5 and 15',
  inject([DiceService], (service: DiceService) => {
    let dice: DiceRolls;
    for (let i = 0; i < 10; i++) {
      dice = service.rollMoreDice('2d6+3');
      expect(dice.total).toBeGreaterThanOrEqual(5);
      expect(dice.total).toBeLessThanOrEqual(15);
      expect(dice.rolls.length).toBe(2);
      expect(dice.rolls[0]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[0]).toBeLessThanOrEqual(6);
    }
  }));

  it('should be 2d6+2d6 dice roll between 4 and 24',
  inject([DiceService], (service: DiceService) => {
    let dice: DiceRolls;
    for (let i = 0; i < 10; i++) {
      dice = service.rollMoreDice('2d6+2d6');
      expect(dice.total).toBeGreaterThanOrEqual(4);
      expect(dice.total).toBeLessThanOrEqual(24);
      expect(dice.rolls.length).toBe(4);
      expect(dice.rolls[0]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[0]).toBeLessThanOrEqual(6);
      expect(dice.rolls[3]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[3]).toBeLessThanOrEqual(6);
    }
  }));

  it('should be 2d6-1d6 dice roll between -4 and 11',
  inject([DiceService], (service: DiceService) => {
    let dice: DiceRolls;
    for (let i = 0; i < 10; i++) {
      dice = service.rollMoreDice('2d6-1d6');
      expect(dice.total).toBeGreaterThanOrEqual(-4);
      expect(dice.total).toBeLessThanOrEqual(11);
      expect(dice.rolls.length).toBe(3);
      expect(dice.rolls[0]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[0]).toBeLessThanOrEqual(6);
      expect(dice.rolls[2]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[2]).toBeLessThanOrEqual(6);
    }
  }));

  it('should be 1d6*1d4 dice roll between 1 and 24',
  inject([DiceService], (service: DiceService) => {
    let dice: DiceRolls;
    for (let i = 0; i < 10; i++) {
      dice = service.rollMoreDice('1d6*1d4');
      expect(dice.total).toBeGreaterThanOrEqual(1);
      expect(dice.total).toBeLessThanOrEqual(24);
      expect(dice.rolls.length).toBe(2);
      expect(dice.rolls[0]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[0]).toBeLessThanOrEqual(6);
      expect(dice.rolls[1]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[1]).toBeLessThanOrEqual(4);
    }
  }));

  it('should be 1d6/2 dice roll between 0.5 and 3',
  inject([DiceService], (service: DiceService) => {
    let dice: DiceRolls;
    for (let i = 0; i < 10; i++) {
      dice = service.rollMoreDice('1d6/2');
      expect(dice.total).toBeGreaterThanOrEqual(0.5);
      expect(dice.total).toBeLessThanOrEqual(3);
      expect(dice.rolls.length).toBe(1);
      expect(dice.rolls[0]).toBeGreaterThanOrEqual(1);
      expect(dice.rolls[0]).toBeLessThanOrEqual(6);
    }
  }));

  it('should d4 contain max, min, and inbetween',
  inject([DiceService], (service: DiceService) => {
    const dice: DiceRolls = service.rollMoreDice('100d6');
    expect(dice.rolls.some(d => d === 1)).toBeTruthy();
    expect(dice.rolls.some(d => d === 2)).toBeTruthy();
    expect(dice.rolls.some(d => d === 3)).toBeTruthy();
    expect(dice.rolls.some(d => d === 4)).toBeTruthy();
    expect(dice.rolls.some(d => d === 5)).toBeTruthy();
    expect(dice.rolls.some(d => d === 6)).toBeTruthy();
    expect(dice.rolls.every( d => d > 0 && d < 7)).toBeTruthy();

    const rolls = new Array<number>();
    for ( let i = 0; i < 100; i++) {
      rolls.push(service.generateNumber(4, 8));
    }
    expect(rolls.some(d => d === 4)).toBeTruthy();
    expect(rolls.some(d => d === 5)).toBeTruthy();
    expect(rolls.some(d => d === 6)).toBeTruthy();
    expect(rolls.some(d => d === 7)).toBeTruthy();
    expect(rolls.some(d => d === 8)).toBeTruthy();
    expect(rolls.every( d => d > 3 && d < 9)).toBeTruthy();
  }));



  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
