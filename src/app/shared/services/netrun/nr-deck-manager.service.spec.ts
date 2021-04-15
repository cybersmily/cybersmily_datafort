import { DataService } from './../file-services';
import { NrDeckDataService } from './nr-deck-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject  } from '@angular/core/testing';

import { NrDeckManagerService } from './nr-deck-manager.service';

describe('NrDeckManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NrDeckDataService, DataService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([NrDeckManagerService, HttpTestingController], (service: NrDeckManagerService) => {
    expect(service).toBeTruthy();
  }));
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
