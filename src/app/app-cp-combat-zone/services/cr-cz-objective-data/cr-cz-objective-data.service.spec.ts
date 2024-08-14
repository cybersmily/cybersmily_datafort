import { TestBed } from '@angular/core/testing';

import { CrCzObjectiveDataService } from './cr-cz-objective-data.service';

describe('CrCzObjectiveDataService', () => {
  let service: CrCzObjectiveDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzObjectiveDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
