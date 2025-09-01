import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { TestBed } from '@angular/core/testing';

import { GangDataService } from './gang-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GangDataService', () => {
  let service: GangDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(GangDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
