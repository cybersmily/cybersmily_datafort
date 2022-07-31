import { TestBed } from '@angular/core/testing';

import { CpRedCharacterPdfService } from './cp-red-character-pdf.service';

describe('CpRedCharacterPdfService', () => {
  let service: CpRedCharacterPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedCharacterPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
