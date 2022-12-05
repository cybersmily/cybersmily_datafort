import { TestBed } from '@angular/core/testing';

import { Cp2020RandomWeaponSettingsService } from './cp2020-random-weapon-settings.service';

describe('Cp2020RandomWeaponSettingsService', () => {
  let service: Cp2020RandomWeaponSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020RandomWeaponSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
