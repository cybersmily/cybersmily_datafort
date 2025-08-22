import { DataService } from './../file-services';
import { NrDeckDataService } from './nr-deck-data.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject  } from '@angular/core/testing';

import { NrDeckManagerService } from './nr-deck-manager.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NrDeckManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [NrDeckDataService, DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should be created', inject([NrDeckManagerService, HttpTestingController], (service: NrDeckManagerService) => {
    expect(service).toBeTruthy();
  }));
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
