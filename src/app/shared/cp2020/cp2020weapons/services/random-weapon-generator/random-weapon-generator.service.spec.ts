import { TestBed } from '@angular/core/testing';

import { RandomWeaponGeneratorService } from './random-weapon-generator.service';

describe('RandomWeaponGeneratorService', () => {
  let service: RandomWeaponGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomWeaponGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
