import { TestBed } from '@angular/core/testing';

import { GangDataService } from './gang-data.service';

describe('GangDataService', () => {
  let service: GangDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GangDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
