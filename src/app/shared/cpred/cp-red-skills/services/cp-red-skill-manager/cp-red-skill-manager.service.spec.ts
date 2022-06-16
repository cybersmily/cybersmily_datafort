import { TestBed } from '@angular/core/testing';

import { CpRedSkillManagerService } from './cp-red-skill-manager.service';

describe('CpRedSkillManagerService', () => {
  let service: CpRedSkillManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedSkillManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
