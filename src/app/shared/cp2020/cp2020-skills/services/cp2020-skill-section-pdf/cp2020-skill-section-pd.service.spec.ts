import { TestBed } from '@angular/core/testing';

import { Cp2020SkillSectionPdService } from './cp2020-skill-section-pd.service';

describe('Cp2020SkillSectionPdService', () => {
  let service: Cp2020SkillSectionPdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020SkillSectionPdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
