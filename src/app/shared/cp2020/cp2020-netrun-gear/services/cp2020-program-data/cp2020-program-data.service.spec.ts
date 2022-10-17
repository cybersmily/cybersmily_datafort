import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Cp2020ProgramDataService } from './cp2020-program-data.service';

describe('Cp2020ProgramDataService', () => {
  let service: Cp2020ProgramDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(Cp2020ProgramDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
