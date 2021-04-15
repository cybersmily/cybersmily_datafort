import { WeaponRanges } from './weapon-ranges';
import { TestBed } from '@angular/core/testing';

describe('WeaponRanges', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const wpn: WeaponRanges = new WeaponRanges(50);
    expect(wpn).toBeTruthy();
  });

  it('should range be properly set', () => {
    let wpn: WeaponRanges = new WeaponRanges(100);
    expect(wpn.pointBlank === 1).toBeTruthy();
    expect(wpn.close === 25).toBeTruthy();
    expect(wpn.medium === 50).toBeTruthy();
    expect(wpn.long === 100).toBeTruthy();
    expect(wpn.extreme === 200).toBeTruthy();
    wpn = new WeaponRanges(50);
    expect(wpn.pointBlank === 1).toBeTruthy();
    expect(wpn.close === 12).toBeTruthy();
    expect(wpn.medium === 25).toBeTruthy();
    expect(wpn.long === 50).toBeTruthy();
    expect(wpn.extreme === 100).toBeTruthy();
  });

  it('should return proper range', () => {
    const wpn: WeaponRanges = new WeaponRanges(100);
    let range = wpn.rangeBracket(1);
    expect(range.bracket.toLowerCase() === 'point blank').toBeTruthy();
    expect(range.diff === 10).toBeTruthy();
    range = wpn.rangeBracket(25);
    expect(range.bracket.toLowerCase() === 'close').toBeTruthy();
    expect(range.diff === 15).toBeTruthy();
    range = wpn.rangeBracket(50);
    expect(range.bracket.toLowerCase() === 'medium').toBeTruthy();
    expect(range.diff === 20).toBeTruthy();
    range = wpn.rangeBracket(100);
    expect(range.bracket.toLowerCase() === 'long').toBeTruthy();
    expect(range.diff === 25).toBeTruthy();
    range = wpn.rangeBracket(200);
    expect(range.bracket.toLowerCase() === 'extreme').toBeTruthy();
    expect(range.diff === 30).toBeTruthy();
  });

});
