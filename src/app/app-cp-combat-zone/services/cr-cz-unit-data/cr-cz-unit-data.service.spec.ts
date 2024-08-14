import { TestBed } from '@angular/core/testing';

import { CrCzUnitDataService } from './cr-cz-unit-data.service';

describe('CrCzUnitDataService', () => {
  let service: CrCzUnitDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzUnitDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
