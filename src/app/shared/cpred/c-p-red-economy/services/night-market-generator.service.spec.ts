import { DataService } from './../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NightMarketGeneratorService } from './night-market-generator.service';

describe('NightMarketGeneratorService', () => {
  let service: NightMarketGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DiceService,
        DataService
      ]
    });
    service = TestBed.inject(NightMarketGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
