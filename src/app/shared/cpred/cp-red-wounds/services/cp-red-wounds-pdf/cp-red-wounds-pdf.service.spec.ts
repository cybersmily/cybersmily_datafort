import { TestBed } from '@angular/core/testing';

import { CpRedWoundsPdfService } from './cp-red-wounds-pdf.service';

describe('CpRedWoundsPdfService', () => {
  let service: CpRedWoundsPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpRedWoundsPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
