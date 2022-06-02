import { TestBed } from '@angular/core/testing';

import { CpRedCharacterManagerService } from './cp-red-character-manager.service';

describe('CpRedCharacterManagerService', () => {
  let service: CpRedCharacterManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedCharacterManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
