import { DiceService } from './../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { CpPlayerWeapon } from './';

describe('CpPlayerWeapon', () => {
  let dice: DiceService;
  let testWeapon: CpPlayerWeapon;

  beforeEach(() => {
    dice = new DiceService();
    testWeapon = new CpPlayerWeapon({
      name: 'test1',
      type: 'P',
      wa: 3,
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
  });

  afterEach(() => {
    dice = null;
    testWeapon = null;
  });

  it('should be created', () => {
    expect(testWeapon).toBeTruthy();
  });

  it('should be create from params', () => {
    expect(testWeapon).toBeTruthy('weaopn not successfully created.');
    expect(testWeapon.name).toEqual('test1', 'name was not set.');
    expect(testWeapon.wa).toEqual(3 , 'weapon accuracy was not set.');
    expect(testWeapon.damage).toEqual('2d6', 'damage was not set.');
    expect(testWeapon.cost).toEqual(100, 'cost was not set.');
    expect(testWeapon.source.book).toEqual('Cp2020', 'source was not set.');
    expect(testWeapon.source.page).toEqual(50, 'page was not set.');
  });

  it('should return if jammed', () => {
    const result = testWeapon.checkReliability(dice);
    expect(result).not.toBeUndefined();
    expect(result).not.toEqual('');
  });

  it('should return proper range', () => {
    let range = testWeapon.getRangeBracket(1);
    const rangeValues = [
      { range: 1, bracket: 'point blank', diff: 10 },
      { range: 12, bracket: 'close', diff: 15 },
      { range: 25, bracket: 'medium', diff: 20 },
      { range: 50, bracket: 'long', diff: 25 },
      { range: 100, bracket: 'extreme', diff: 30 }
    ];

    rangeValues.forEach(value => {
      range = testWeapon.getRangeBracket(value.range);
      expect(range.bracket.toLowerCase()).toEqual(value.bracket);
      expect(range.diff).toEqual(value.diff);
    });
  });

  it('should be empty', () => {
    expect(testWeapon.isEmpty).toBeFalsy();
    testWeapon.expendShot(9);
    expect(testWeapon.isEmpty).toBeTruthy();
  });
});
