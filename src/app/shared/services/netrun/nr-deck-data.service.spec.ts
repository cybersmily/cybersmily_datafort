import { DataService } from './../file-services';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject  } from '@angular/core/testing';

import { NrDeckDataService } from './nr-deck-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NrDeckDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [NrDeckDataService, DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should be created', inject([NrDeckDataService, HttpTestingController], (service: NrDeckDataService) => {
    expect(service).toBeTruthy();
  }));
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
