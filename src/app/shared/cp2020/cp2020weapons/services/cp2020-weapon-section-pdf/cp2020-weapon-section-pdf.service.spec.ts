import { TestBed } from '@angular/core/testing';

import { Cp2020WeaponSectionPdfService } from './cp2020-weapon-section-pdf.service';

describe('Cp2020WeaponSectionPdfService', () => {
  let service: Cp2020WeaponSectionPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020WeaponSectionPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
