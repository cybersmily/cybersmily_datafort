import { HotStuffArea } from './hot-stuff-area';
import { TestBed } from '@angular/core/testing';

describe('HotStuffArea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const area = new HotStuffArea();
    expect(area).toBeTruthy();
  });

  it('should be created', () => {
    const area = new HotStuffArea();
    // roll should be expontential increased
    // 1 costs 4
    // 2 costs 8
    // 3 costs 16
    // ...
    // 6 costs 128
    area.rolls = 1;
    expect(area.points === 4).toBeTruthy();
    area.rolls = 4;
    expect(area.points === 32).toBeTruthy();
    area.rolls = 6;
    expect(area.points === 128).toBeTruthy();
  });

  it('should not add more than 6 rolls', () => {
    const area = new HotStuffArea();
    area.rolls = 7;
    expect(area.rolls === 0).toBeTruthy();
    expect(area.points === 0).toBeTruthy();
  });

  it('should not be able to set negative rolls', () => {
    const area = new HotStuffArea();
    area.rolls = -2;
    expect(area.rolls === 0).toBeTruthy();
    expect(area.points === 0).toBeTruthy();
  });
});
