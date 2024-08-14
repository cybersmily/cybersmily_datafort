import { TestBed } from '@angular/core/testing';

import { CrCzArmyPdfService } from './cr-cz-army-pdf.service';

describe('CrCzArmyPdfService', () => {
  let service: CrCzArmyPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrCzArmyPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
