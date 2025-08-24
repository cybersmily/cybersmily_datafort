import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { TestBed } from '@angular/core/testing';

import { Cp2020FixerContactDataService } from './cp2020-fixer-contact-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020FixerContactDataService', () => {
  let service: Cp2020FixerContactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(Cp2020FixerContactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
