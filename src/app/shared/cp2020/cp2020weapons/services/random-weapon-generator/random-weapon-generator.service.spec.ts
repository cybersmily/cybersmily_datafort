import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { RandomWeaponGeneratorService } from './random-weapon-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RandomWeaponGeneratorService', () => {
  let service: RandomWeaponGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DiceService, DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(RandomWeaponGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
