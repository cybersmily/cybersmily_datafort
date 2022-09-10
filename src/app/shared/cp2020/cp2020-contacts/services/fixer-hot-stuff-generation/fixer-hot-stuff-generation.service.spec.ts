import { TestBed } from '@angular/core/testing';

import { FixerHotStuffGenerationService } from './fixer-hot-stuff-generation.service';

describe('FixerHotStuffGenerationService', () => {
  let service: FixerHotStuffGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixerHotStuffGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
