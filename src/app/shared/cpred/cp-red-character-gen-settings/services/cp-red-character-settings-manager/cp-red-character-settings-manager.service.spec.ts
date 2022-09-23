import { TestBed } from '@angular/core/testing';

import { CpRedCharacterSettingsManagerService } from './cp-red-character-settings-manager.service';

describe('CpRedCharacterSettingsManagerService', () => {
  let service: CpRedCharacterSettingsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedCharacterSettingsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
