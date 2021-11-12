import { TestBed } from '@angular/core/testing';

import { Cp2020ACPAPdfService } from './cp2020-acpa-pdf.service';

describe('Cp2020AcpaPdfService', () => {
  let service: Cp2020ACPAPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020ACPAPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
