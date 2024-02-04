import { TestBed } from '@angular/core/testing';

import { CmbtTrckWoundDisplayService } from './cmbt-trck-wound-display.service';

describe('CmbtTrackWoundDisplayService', () => {
  let service: CmbtTrckWoundDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmbtTrckWoundDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
