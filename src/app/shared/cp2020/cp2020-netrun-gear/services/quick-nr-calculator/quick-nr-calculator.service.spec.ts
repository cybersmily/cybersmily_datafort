import { TestBed } from '@angular/core/testing';

import { QuickNrCalculatorService } from './quick-nr-calculator.service';

describe('QuickNrCalculatorService', () => {
  let service: QuickNrCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickNrCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
