import { TestBed } from '@angular/core/testing';

import { FixerHotStuffService } from './fixer-hot-stuff.service';

describe('FixerHotStuffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FixerHotStuffService = TestBed.get(FixerHotStuffService);
    expect(service).toBeTruthy();
  });
});
