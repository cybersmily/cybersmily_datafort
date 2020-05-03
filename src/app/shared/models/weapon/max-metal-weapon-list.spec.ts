import { MaxMetalWeaponList } from './max-metal-weapon-list';
import { TestBed } from '@angular/core/testing';

describe('MaxMetalWeaponList', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const wpnList: MaxMetalWeaponList = new MaxMetalWeaponList();
    expect(wpnList).toBeTruthy();
  });
});
