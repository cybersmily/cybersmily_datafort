import { DiceService } from './../../shared/services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { OpponentTrackerService } from './opponent-tracker.service';

describe('OpponentTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [DiceService]
  }));

  it('should be created', () => {
    const service: OpponentTrackerService = TestBed.inject(OpponentTrackerService);
    expect(service).toBeTruthy();
  });
});
