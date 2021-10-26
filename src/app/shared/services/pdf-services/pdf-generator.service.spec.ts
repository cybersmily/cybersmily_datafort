import { TestBed } from '@angular/core/testing';

import { PdfGeneratorService } from './pdf-generator.service';

describe('PdfGeneratorService', () => {
  let service: PdfGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
