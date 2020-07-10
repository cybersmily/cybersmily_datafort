import { TestBed } from '@angular/core/testing';

import { NrProgramOptionsService } from './nr-program-options.service';

describe('NrProgramOptionsService', () => {
  let service: NrProgramOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NrProgramOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
