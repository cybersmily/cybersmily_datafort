import { TestBed } from '@angular/core/testing';

import { VenditGeneratorService } from './vendit-generator.service';

describe('VenditGeneratorService', () => {
  let service: VenditGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenditGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
