import { DataService } from './../file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CorporationDataService } from './corporation-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CorporationDataService', () => {
  let service: CorporationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(CorporationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
