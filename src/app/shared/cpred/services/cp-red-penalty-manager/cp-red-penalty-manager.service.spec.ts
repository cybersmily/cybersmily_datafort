import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { CpRedSkillsModule } from './../../cp-red-skills/cp-red-skills.module';
import { TestBed } from '@angular/core/testing';

import { CpRedPenaltyManagerService } from './cp-red-penalty-manager.service';

describe('CpRedPenaltyManagerService', () => {
  let service: CpRedPenaltyManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CpRedSkillsModule, HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(CpRedPenaltyManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
