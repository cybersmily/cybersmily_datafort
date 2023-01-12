import { TestBed } from '@angular/core/testing';

import { Cp2020CyberdecksDataService } from './cp2020-cyberdecks-data.service';

describe('Cp2020CyberdecksDataService', () => {
  let service: Cp2020CyberdecksDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020CyberdecksDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
