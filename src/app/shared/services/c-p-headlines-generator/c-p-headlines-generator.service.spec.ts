import { DataService } from './../file-services/dataservice/data.service';
import { DiceService } from './../dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CPHeadlinesGeneratorService } from './c-p-headlines-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CPHeadlinesGeneratorService', () => {
  let service: CPHeadlinesGeneratorService;

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
    service = TestBed.inject(CPHeadlinesGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
