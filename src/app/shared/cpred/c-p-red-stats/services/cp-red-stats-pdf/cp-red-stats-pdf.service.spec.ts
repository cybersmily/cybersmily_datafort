import { TestBed } from '@angular/core/testing';

import { CpRedStatsPdfService } from './cp-red-stats-pdf.service';

describe('CpRedStatsPdfService', () => {
  let service: CpRedStatsPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedStatsPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
