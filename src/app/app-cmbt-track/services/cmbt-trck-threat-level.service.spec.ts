import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RandomWeaponGeneratorService } from './../../shared/cp2020/cp2020weapons/services/random-weapon-generator/random-weapon-generator.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { CmbtTrckThreatLevelService } from './cmbt-trck-threat-level.service';

describe('CmbtTrckThreatLevelService', () => {
  let service: CmbtTrckThreatLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        DiceService,
        RandomWeaponGeneratorService,
        DataService
      ]
    });
    service = TestBed.inject(CmbtTrckThreatLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
