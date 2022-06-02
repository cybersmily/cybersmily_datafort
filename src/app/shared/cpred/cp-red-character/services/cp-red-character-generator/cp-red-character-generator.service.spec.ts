import { TestBed } from '@angular/core/testing';

import { CpRedCharacterGeneratorService } from './cp-red-character-generator.service';

describe('CpRedCharacterGeneratorService', () => {
  let service: CpRedCharacterGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedCharacterGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
