import { TestBed } from '@angular/core/testing';

import { CPRedLifePathGeneratorService } from './c-p-red-life-path-generator.service';

describe('CPRedLifePathGeneratorService', () => {
  let service: CPRedLifePathGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CPRedLifePathGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
