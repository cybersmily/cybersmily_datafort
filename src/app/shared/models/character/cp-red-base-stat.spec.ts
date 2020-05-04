import { CpRedBaseStat } from './cp-red-base-stat';
import { TestBed } from '@angular/core/testing';

describe('CpRedBaseStat', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const stat: CpRedBaseStat = new CpRedBaseStat();
    expect(stat).toBeTruthy();
  });

  it('should set stat', () => {
    const stat: CpRedBaseStat = new CpRedBaseStat();
    stat.set(7);
    expect(stat.adjusted === 0).toBeTruthy();
    expect(stat.base === 7).toBeTruthy();
    expect(stat.current === 7).toBeTruthy();
  });

  it('should adjust stat', () => {
    const stat: CpRedBaseStat = new CpRedBaseStat();
    stat.set(7);
    stat.adjusted = 1;
    expect(stat.adjusted === 1).toBeTruthy(stat.adjusted);
    expect(stat.base === 7).toBeTruthy(stat.base);
    expect(stat.current === 8).toBeTruthy(stat.current);
    stat.set(7);
    stat.adjusted = -3;
    expect(stat.adjusted === -3).toBeTruthy();
    expect(stat.base === 7).toBeTruthy();
    expect(stat.current === 4).toBeTruthy();
  });

});
