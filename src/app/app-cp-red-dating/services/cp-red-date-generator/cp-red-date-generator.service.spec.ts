import { DataService } from './../../../shared/services/file-services/dataservice/data.service';
import { DiceService } from './../../../shared/services/dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CpRedDateGeneratorService } from './cp-red-date-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CpRedDateGeneratorService', () => {
  let service: CpRedDateGeneratorService;

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
    service = TestBed.inject(CpRedDateGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
