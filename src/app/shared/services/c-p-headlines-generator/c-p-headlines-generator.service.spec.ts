import { TestBed } from '@angular/core/testing';

import { CPHeadlinesGeneratorService } from './c-p-headlines-generator.service';

describe('CPHeadlinesGeneratorService', () => {
  let service: CPHeadlinesGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CPHeadlinesGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
