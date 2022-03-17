import { TestBed } from '@angular/core/testing';

import { NightMarketGeneratorService } from './night-market-generator.service';

describe('NightMarketGeneratorService', () => {
  let service: NightMarketGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NightMarketGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
