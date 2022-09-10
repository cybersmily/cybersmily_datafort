import { TestBed } from '@angular/core/testing';

import { FixerBigLeagueGenerationService } from './fixer-big-league-generation.service';

describe('FixerBigLeagueGenerationService', () => {
  let service: FixerBigLeagueGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixerBigLeagueGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
