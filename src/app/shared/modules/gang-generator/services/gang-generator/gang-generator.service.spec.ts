import { TestBed } from '@angular/core/testing';

import { GangGeneratorService } from './gang-generator.service';

describe('GangGeneratorService', () => {
  let service: GangGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GangGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
