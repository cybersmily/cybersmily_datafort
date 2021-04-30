import { TestBed } from '@angular/core/testing';

import { CPRedNetArchChartsService } from './c-p-red-net-arch-charts.service';

describe('CPRedNetArchChartsService', () => {
  let service: CPRedNetArchChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CPRedNetArchChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
