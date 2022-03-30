import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CpRedWeatherGeneratorService } from './cp-red-weather-generator.service';

describe('CpRedWeatherGeneratorService', () => {
  let service: CpRedWeatherGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DiceService,
        DataService
      ]
    });
    service = TestBed.inject(CpRedWeatherGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
