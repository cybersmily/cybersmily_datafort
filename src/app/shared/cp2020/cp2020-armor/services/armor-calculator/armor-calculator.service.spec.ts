import { TestBed } from '@angular/core/testing';

import { ArmorCalculatorService } from './armor-calculator.service';

describe('ArmorCostCalculatorService', () => {
  let service: ArmorCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
