import { TestBed } from '@angular/core/testing';

import { Cp2020FixerContactDataService } from './cp2020-fixer-contact-data.service';

describe('Cp2020FixerContactDataService', () => {
  let service: Cp2020FixerContactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020FixerContactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
