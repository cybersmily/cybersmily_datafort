import { CpRedBaseStats } from './cp-red-base-stats';
import { TestBed } from '@angular/core/testing';

describe('CpRedBaseStats', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const stats: CpRedBaseStats = new CpRedBaseStats();
    expect(stats).toBeTruthy();
  });

  it('should have death save', () => {
    const stats: CpRedBaseStats = new CpRedBaseStats();
    stats.BODY.set(7);
    expect(stats.deathSave === 7).toBeTruthy();
    stats.BODY.adjusted = -2;
    expect(stats.deathSave === 5).toBeTruthy();
    stats.BODY.adjusted = 2;
    expect(stats.deathSave === 9).toBeTruthy();
  });


  it('should have HP', () => {
    const stats: CpRedBaseStats = new CpRedBaseStats();
    stats.BODY.set(7);
    expect(stats.startingHP === 35).toBeTruthy(stats.woundThreshold);
    stats.BODY.set(2);
    expect(stats.startingHP === 10).toBeTruthy(stats.woundThreshold);
  });

  it('should have wound threshold', () => {
    const stats: CpRedBaseStats = new CpRedBaseStats();
    stats.BODY.set(7);
    expect(stats.woundThreshold === 18).toBeTruthy(stats.woundThreshold);
    stats.BODY.set(2);
    expect(stats.woundThreshold === 5).toBeTruthy(stats.woundThreshold);
  });
});
