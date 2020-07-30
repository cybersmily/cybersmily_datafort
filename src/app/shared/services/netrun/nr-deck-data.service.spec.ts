import { DataService } from './../data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject  } from '@angular/core/testing';

import { NrDeckDataService } from './nr-deck-data.service';

describe('NrDeckDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NrDeckDataService, DataService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([NrDeckDataService, HttpTestingController], (service: NrDeckDataService) => {
    expect(service).toBeTruthy();
  }));
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
