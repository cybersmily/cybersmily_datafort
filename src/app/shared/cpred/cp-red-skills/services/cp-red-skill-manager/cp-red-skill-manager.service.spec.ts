import { CpRedSkillDataService } from './../cp-red-skill-data/cp-red-skill-data.service';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CpRedSkillManagerService } from './cp-red-skill-manager.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CpRedSkillManagerService', () => {
  let service: CpRedSkillManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, CpRedSkillDataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(CpRedSkillManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
