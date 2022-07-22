import { TestBed } from '@angular/core/testing';

import { GangPdfService } from './gang-pdf.service';

describe('GangPdfService', () => {
  let service: GangPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GangPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
