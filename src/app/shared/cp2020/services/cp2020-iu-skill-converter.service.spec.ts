import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../services/file-services/data.service';
import { TestBed } from '@angular/core/testing';

import { Cp2020IuSkillConverterService } from './cp2020-iu-skill-converter.service';

describe('Cp2020IuSkillConverterService', () => {
  let service: Cp2020IuSkillConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    });
    service = TestBed.inject(Cp2020IuSkillConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
