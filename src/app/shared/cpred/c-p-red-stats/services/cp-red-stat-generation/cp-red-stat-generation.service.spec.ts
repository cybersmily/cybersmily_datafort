import { TestBed } from '@angular/core/testing';

import { CpRedStatGenerationService } from './cp-red-stat-generation.service';

describe('CpRedStatGenerationService', () => {
  let service: CpRedStatGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedStatGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
