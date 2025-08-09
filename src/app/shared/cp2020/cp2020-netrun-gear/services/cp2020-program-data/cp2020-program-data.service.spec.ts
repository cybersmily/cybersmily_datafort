import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Cp2020ProgramDataService } from './cp2020-program-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020ProgramDataService', () => {
  let service: Cp2020ProgramDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(Cp2020ProgramDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
