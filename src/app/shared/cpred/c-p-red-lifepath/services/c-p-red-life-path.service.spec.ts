import { TestBed } from '@angular/core/testing';

import { CPRedLifePathService } from './c-p-red-life-path.service';

describe('CPRedLifePathService', () => {
  let service: CPRedLifePathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CPRedLifePathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
