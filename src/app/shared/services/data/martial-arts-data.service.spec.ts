import { TestBed } from '@angular/core/testing';

import { MartialArtsDataService } from './martial-arts-data.service';

describe('MartialArtsDataService', () => {
  let service: MartialArtsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MartialArtsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
