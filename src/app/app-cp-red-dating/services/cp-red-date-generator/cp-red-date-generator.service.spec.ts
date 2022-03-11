import { TestBed } from '@angular/core/testing';

import { CpRedDateGeneratorService } from './cp-red-date-generator.service';

describe('CpRedDateGeneratorService', () => {
  let service: CpRedDateGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedDateGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
