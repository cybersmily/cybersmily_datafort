import { DataService } from './../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NightMarketGeneratorService } from './night-market-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NightMarketGeneratorService', () => {
  let service: NightMarketGeneratorService;

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
    service = TestBed.inject(NightMarketGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
