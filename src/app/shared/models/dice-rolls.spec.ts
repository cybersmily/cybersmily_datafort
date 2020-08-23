import { DiceRolls } from './dice-rolls';
import { TestBed } from '@angular/core/testing';

describe('DiceRolls', () => {
  let diceRolls1: DiceRolls;
  let diceRolls2: DiceRolls;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    diceRolls1 = new DiceRolls();
    diceRolls1.rolls = [2, 5];
    diceRolls1.total = 7;
    diceRolls2 = new DiceRolls();
    diceRolls2.rolls = [2, 1, 1];
    diceRolls2.total = 4;
  });

  it('should be created', () => {
    expect(diceRolls1).toBeTruthy();
    expect(diceRolls2).toBeTruthy();
  });

  it('should add', () => {
    diceRolls1.add(diceRolls2);
    expect(diceRolls1.total === 11).toBeTruthy();
    expect(diceRolls1.rolls.length === 5).toBeTruthy();
    const found = diceRolls1.rolls.filter( d => d === 1);
    expect(found.length === 2).toBeTruthy();
  });

  it('should subtract', () => {
    diceRolls1.subtract(diceRolls2);
    expect(diceRolls1.total === 3).toBeTruthy();
    expect(diceRolls1.rolls.length === 5).toBeTruthy();
    const found = diceRolls1.rolls.filter( d => d === 1);
    expect(found.length === 2).toBeTruthy();
  });

  it('should be multiply', () => {
    diceRolls1.multiply(diceRolls2);
    expect(diceRolls1.total === 28).toBeTruthy();
    expect(diceRolls1.rolls.length === 5).toBeTruthy();
    const found = diceRolls1.rolls.filter( d => d === 1);
    expect(found.length === 2).toBeTruthy();
  });

  it('should be shown as string', () => {
    expect(diceRolls1.show()).toBe(`7 [Dice: (2, 5)]`);
    diceRolls1.mod = '+ 3';
    expect(diceRolls1.show()).toBe(`7 [Dice: (2, 5)+ 3]`);
  });
});
