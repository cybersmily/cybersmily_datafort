import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CpRedSkillDataService } from './cp-red-skill-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CpRedSkillDataService', () => {
  let service: CpRedSkillDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(CpRedSkillDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
