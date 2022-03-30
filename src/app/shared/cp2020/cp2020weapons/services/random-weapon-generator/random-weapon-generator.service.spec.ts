import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { RandomWeaponGeneratorService } from './random-weapon-generator.service';

describe('RandomWeaponGeneratorService', () => {
  let service: RandomWeaponGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiceService, DataService]
    });
    service = TestBed.inject(RandomWeaponGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
