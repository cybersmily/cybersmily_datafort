import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { TestBed } from '@angular/core/testing';

import { CPRedNetArchChartsService } from './c-p-red-net-arch-charts.service';

describe('CPRedNetArchChartsService', () => {
  let service: CPRedNetArchChartsService;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi())
    ]
});
    dataService = TestBed.inject(DataService);
    service = new CPRedNetArchChartsService(dataService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
