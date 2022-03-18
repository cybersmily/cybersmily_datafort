import { TestBed } from '@angular/core/testing';

import { CpRedWeatherGeneratorService } from './cp-red-weather-generator.service';

describe('CpRedWeatherGeneratorService', () => {
  let service: CpRedWeatherGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedWeatherGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
