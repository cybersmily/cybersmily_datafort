import { DataService } from './../file-services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject  } from '@angular/core/testing';

import { NrProgramOptionsService } from './nr-program-options.service';

describe('NrProgramOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NrProgramOptionsService, DataService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([NrProgramOptionsService, HttpTestingController], (service: NrProgramOptionsService) => {
    expect(service).toBeTruthy();
  }));
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
