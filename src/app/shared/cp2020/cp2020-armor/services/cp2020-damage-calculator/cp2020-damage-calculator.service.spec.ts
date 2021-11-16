import { TestBed } from '@angular/core/testing';

import { Cp2020DamageCalculatorService } from './cp2020-damage-calculator.service';

describe('Cp2020DamageCalculatorService', () => {
  let service: Cp2020DamageCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020DamageCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
