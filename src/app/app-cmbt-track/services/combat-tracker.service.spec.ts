import { DiceService } from './../../shared/services/dice/dice.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { TestBed } from '@angular/core/testing';

import { CombatTrackerService } from './combat-tracker.service';

describe('CombatTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, DiceService, provideHttpClient(withInterceptorsFromDi())]
});
});

  it('should be created', () => {
    const service: CombatTrackerService = TestBed.get(CombatTrackerService);
    expect(service).toBeTruthy();
  });
});
