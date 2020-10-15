import { TestBed } from '@angular/core/testing';

import { CmbtZoneEventService } from './cmbt-zone-event.service';

describe('CmbtZoneEventService', () => {
  let service: CmbtZoneEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmbtZoneEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
