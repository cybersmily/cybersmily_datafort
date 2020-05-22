import { TestBed } from '@angular/core/testing';

import { ArmorDataService } from './armor-data.service';

describe('ArmorDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArmorDataService = TestBed.get(ArmorDataService);
    expect(service).toBeTruthy();
  });
});
