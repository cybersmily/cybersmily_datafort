import { TestBed } from '@angular/core/testing';

import { CrCzProgramDataService } from './cr-cz-program-data.service';

describe('CrCzProgramDataService', () => {
  let service: CrCzProgramDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzProgramDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
