import { TestBed } from '@angular/core/testing';

import { CrCzGearDataService } from './cr-cz-gear-data.service';

describe('CrCzGearDataService', () => {
  let service: CrCzGearDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzGearDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
