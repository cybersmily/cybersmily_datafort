import { TestBed } from '@angular/core/testing';

import { CpRedStatsManagerService } from './cp-red-stats-manager.service';

describe('CpRedStatsManagerService', () => {
  let service: CpRedStatsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedStatsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
