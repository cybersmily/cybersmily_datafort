import { TestBed } from '@angular/core/testing';

import { BodegasGeneratorService } from './bodegas-generator.service';

describe('BodegasGeneratorService', () => {
  let service: BodegasGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodegasGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
