import { SourceBook } from './../sourcebook';
import { TestBed } from '@angular/core/testing';

import { CpPlayerWeapon } from './';

describe('CpPlayerWeapon', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const wpn: CpPlayerWeapon = new CpPlayerWeapon();
    expect(wpn).toBeTruthy();
  });

  it('should be create from params', () => {
    const wpn: CpPlayerWeapon = new CpPlayerWeapon({
      name: 'test1',
      type: 'P',
      wa: 3,
      conc: 'J',
      avail: 'P',
      damage: '2d6',
      shots: 10,
      shotsUsed: 10,
      rof: 1,
      rel: 'ST',
      cost: 100,
      jammed: false,
      notes: '',
      range: 50,
      source: { book: 'Cp2020', page: 50},
    });
    expect(wpn).toBeTruthy('weaopn not successfully created.');
    expect(wpn.name === 'test1' ).toBeTruthy('name was not set.');
    expect(wpn.wa === 3 ).toBeTruthy('weapon accuracy was not set.');
    expect(wpn.damage === '2d6' ).toBeTruthy('damage was not set.');
    expect(wpn.cost === 100 ).toBeTruthy('cost was not set.');
    expect(wpn.source.book === 'Cp2020' && wpn.source.page === 50).toBeTruthy('source was not set.');
  });

  it('should return if jammed', () => {
    const wpn: CpPlayerWeapon = new CpPlayerWeapon({
      name: 'test1',
      wa: 3,
      damage: '2d6',
      cost: 100,
      jammed: false,
      rel: 'VR',
      source: { book: 'Cp2020', page: 50}
    });
    wpn.checkReliability(3);
    expect(wpn.jammed).toBeTruthy('Very Reliable should failed.');
    wpn.checkReliability(4);
    expect(wpn.jammed).toBeFalsy('Very Reliable should succeeded.');
    wpn.rel = 'ST';
    wpn.checkReliability(5);
    expect(wpn.jammed).toBeTruthy('Standard should failed.');
    wpn.checkReliability(6);
    expect(wpn.jammed).toBeFalsy('Standard should succeeded.');
    wpn.rel = 'UR';
    wpn.checkReliability(8);
    expect(wpn.jammed).toBeTruthy('Unreliable should failed.');
    wpn.checkReliability(9);
    expect(wpn.jammed).toBeFalsy('Unreliable should succeeded.');
  });

  it('should return proper range', () => {
    const wpn: CpPlayerWeapon = new CpPlayerWeapon({
      name: 'test1',
      wa: 3,
      damage: '2d6',
      cost: 100,
      rel: 'VR',
      range: 100,
      source: { book: 'Cp2020', page: 50}
    });
    let range = wpn.getRangeBracket(1);
    expect(range.bracket.toLowerCase() === 'point blank').toBeTruthy();
    expect(range.diff === 10).toBeTruthy();
    range = wpn.getRangeBracket(25);
    expect(range.bracket.toLowerCase() === 'close').toBeTruthy();
    expect(range.diff === 15).toBeTruthy();
    range = wpn.getRangeBracket(50);
    expect(range.bracket.toLowerCase() === 'medium').toBeTruthy();
    expect(range.diff === 20).toBeTruthy();
    range = wpn.getRangeBracket(100);
    expect(range.bracket.toLowerCase() === 'long').toBeTruthy();
    expect(range.diff === 25).toBeTruthy();
    range = wpn.getRangeBracket(200);
    expect(range.bracket.toLowerCase() === 'extreme').toBeTruthy();
    expect(range.diff === 30).toBeTruthy();
  });

  it('should be empty', () => {
    const wpn: CpPlayerWeapon = new CpPlayerWeapon({
      name: 'test1',
      wa: 3,
      damage: '2d6',
      shots: 10,
      shotsUsed: 10,
      cost: 100,
      rel: 'VR',
      range: 100,
      source: { book: 'Cp2020', page: 50}
    });
    expect(wpn.isEmpty).toBeTruthy();
    wpn.shotsUsed = 0;
    expect(wpn.isEmpty).toBeFalsy();
    wpn.shotsUsed = 6;
    expect(wpn.isEmpty).toBeFalsy();
  });
});
