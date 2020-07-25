import { TestBed } from '@angular/core/testing';

import { NrDeckManagerService } from './nr-deck-manager.service';

describe('NrDeckManagerService', () => {
  let service: NrDeckManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NrDeckManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
