import { TestBed } from '@angular/core/testing';

import { NrDeckDataService } from './nr-deck-data.service';

describe('NrDeckDataService', () => {
  let service: NrDeckDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NrDeckDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
