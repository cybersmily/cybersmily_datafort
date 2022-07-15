import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CpRedSkillDataService } from './cp-red-skill-data.service';

describe('CpRedSkillDataService', () => {
  let service: CpRedSkillDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(CpRedSkillDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
