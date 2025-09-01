import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CpRedWeatherGeneratorService } from './cp-red-weather-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CpRedWeatherGeneratorService', () => {
  let service: CpRedWeatherGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DiceService,
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(CpRedWeatherGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
