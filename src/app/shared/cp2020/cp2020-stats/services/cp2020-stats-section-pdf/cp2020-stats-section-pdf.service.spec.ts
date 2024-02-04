import { TestBed } from '@angular/core/testing';

import { Cp2020StatsSectionPdfService } from './cp2020-stats-section-pdf.service';

describe('Cp2020StatsSectionPdfService', () => {
  let service: Cp2020StatsSectionPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020StatsSectionPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
