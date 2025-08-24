import { TestBed } from '@angular/core/testing';

import { CrCzReleasesDataService } from './cr-cz-releases-data.service';

describe('CrCzReleasesDataService', () => {
  let service: CrCzReleasesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzReleasesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
