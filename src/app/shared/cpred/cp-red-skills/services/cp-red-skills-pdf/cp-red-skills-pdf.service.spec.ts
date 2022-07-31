import { TestBed } from '@angular/core/testing';

import { CpRedSkillsPdfService } from './cp-red-skills-pdf.service';

describe('CpRedSkillsPdfService', () => {
  let service: CpRedSkillsPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedSkillsPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
