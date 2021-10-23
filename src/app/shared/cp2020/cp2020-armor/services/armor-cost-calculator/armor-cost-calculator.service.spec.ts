import { TestBed } from '@angular/core/testing';

import { ArmorCostCalculatorService } from './armor-cost-calculator.service';

describe('ArmorCostCalculatorService', () => {
  let service: ArmorCostCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorCostCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
