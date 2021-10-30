import { TestBed } from '@angular/core/testing';

import { Cp2020ArmorPDFSectionService } from './cp2020-armor-pdf-section.service';

describe('Cp2020ArmorPdfSectionService', () => {
  let service: Cp2020ArmorPDFSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020ArmorPDFSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
