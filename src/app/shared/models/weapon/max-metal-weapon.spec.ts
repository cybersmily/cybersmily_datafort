import { MaxMetalWeapon } from './max-metal-weapon';
import { TestBed } from '@angular/core/testing';

describe('MaxMetalWeapon', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const wpn: MaxMetalWeapon = new MaxMetalWeapon();
    expect(wpn).toBeTruthy();
  });
});
