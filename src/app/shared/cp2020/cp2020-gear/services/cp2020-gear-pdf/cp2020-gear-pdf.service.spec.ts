import { TestBed } from '@angular/core/testing';

import { Cp2020GearPdfService } from './cp2020-gear-pdf.service';

describe('Cp2020GearPdfService', () => {
  let service: Cp2020GearPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020GearPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
