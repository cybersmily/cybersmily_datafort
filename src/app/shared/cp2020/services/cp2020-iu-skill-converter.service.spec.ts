import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../services/file-services';
import { TestBed } from '@angular/core/testing';

import { Cp2020IuSkillConverterService } from './cp2020-iu-skill-converter.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020IuSkillConverterService', () => {
  let service: Cp2020IuSkillConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(Cp2020IuSkillConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
