import { TestBed } from '@angular/core/testing';

import { ClothingListPdfService } from './clothing-list-pdf.service';

describe('ClothingListPdService', () => {
  let service: ClothingListPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClothingListPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
