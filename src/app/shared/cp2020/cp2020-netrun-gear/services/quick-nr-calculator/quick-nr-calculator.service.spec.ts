import { Cp2020Cyberdeck } from './../../models/cp2020-cyberdeck';
import { TestBed } from '@angular/core/testing';

import { QuickNrCalculatorService } from './quick-nr-calculator.service';

describe('QuickNrCalculatorService', () => {
  let service: QuickNrCalculatorService;
  let cyberdeck: Cp2020Cyberdeck;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickNrCalculatorService);
    cyberdeck = new Cp2020Cyberdeck();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
