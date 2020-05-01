import { TestBed } from '@angular/core/testing';

import { NrMapPositionService } from './nr-map-position.service';

describe('NrMapPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NrMapPositionService = TestBed.get(NrMapPositionService);
    expect(service).toBeTruthy();
  });
});
