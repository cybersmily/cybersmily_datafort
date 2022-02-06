import { TestBed } from '@angular/core/testing';

import { CmbtTrckThreatLevelService } from './cmbt-trck-threat-level.service';

describe('CmbtTrckThreatLevelService', () => {
  let service: CmbtTrckThreatLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmbtTrckThreatLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
