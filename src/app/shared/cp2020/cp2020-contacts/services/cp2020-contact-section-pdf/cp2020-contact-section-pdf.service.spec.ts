import { TestBed } from '@angular/core/testing';

import { Cp2020ContactSectionPdfService } from './cp2020-contact-section-pdf.service';

describe('Cp2020ContactSectionPdfService', () => {
  let service: Cp2020ContactSectionPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020ContactSectionPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
