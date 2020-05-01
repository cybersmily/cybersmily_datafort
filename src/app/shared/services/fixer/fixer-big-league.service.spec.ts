import { TestBed } from '@angular/core/testing';

import { FixerBigLeagueService } from './fixer-big-league.service';

describe('FixerBigLeagueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FixerBigLeagueService = TestBed.get(FixerBigLeagueService);
    expect(service).toBeTruthy();
  });
});
