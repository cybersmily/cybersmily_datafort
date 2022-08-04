import { TestBed } from '@angular/core/testing';

import { CpRedPenaltyManagerService } from './cp-red-penalty-manager.service';

describe('CpRedPenaltyManagerService', () => {
  let service: CpRedPenaltyManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedPenaltyManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
