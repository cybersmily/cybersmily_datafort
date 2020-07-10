import { TestBed } from '@angular/core/testing';

import { NrProgramListService } from './nr-program-list.service';

describe('NrProgramListService', () => {
  let service: NrProgramListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NrProgramListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
