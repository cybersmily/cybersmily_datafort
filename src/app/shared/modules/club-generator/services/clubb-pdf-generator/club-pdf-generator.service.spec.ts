import { TestBed } from '@angular/core/testing';

import { ClubPdfGeneratorService } from './club-pdf-generator.service';

describe('ClubPdfGeneratorService', () => {
  let service: ClubPdfGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubPdfGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
