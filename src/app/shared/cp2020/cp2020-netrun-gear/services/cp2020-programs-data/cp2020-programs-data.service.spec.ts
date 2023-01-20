import { TestBed } from '@angular/core/testing';

import { Cp2020ProgramsDataService } from './cp2020-programs-data.service';

describe('Cp2020ProgramsDataService', () => {
  let service: Cp2020ProgramsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020ProgramsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
