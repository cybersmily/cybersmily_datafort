import { TestBed } from '@angular/core/testing';

import { RxLabDataService } from './rx-lab-data.service';

describe('RxLabDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RxLabDataService = TestBed.get(RxLabDataService);
    expect(service).toBeTruthy();
  });
});
