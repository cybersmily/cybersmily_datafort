import { TestBed, inject } from '@angular/core/testing';

import { NrTrackerService } from './nr-tracker.service';
import { DiceService } from './../../shared/services/dice/dice.service';

describe('NrTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NrTrackerService, DiceService]
    });
  });

  it('should be created', inject([NrTrackerService], (service: NrTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
