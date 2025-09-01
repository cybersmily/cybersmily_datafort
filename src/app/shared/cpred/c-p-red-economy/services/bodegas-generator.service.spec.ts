import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BodegasGeneratorService } from './bodegas-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BodegasGeneratorService', () => {
  let service: BodegasGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        DiceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(BodegasGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
