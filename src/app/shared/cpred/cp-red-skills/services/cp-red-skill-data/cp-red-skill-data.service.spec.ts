import { TestBed } from '@angular/core/testing';

import { CpRedSkillDataService } from './cp-red-skill-data.service';

describe('CpRedSkillDataService', () => {
  let service: CpRedSkillDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedSkillDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
