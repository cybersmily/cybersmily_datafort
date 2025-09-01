import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ClubChartDataService } from './club-chart-data.service';

describe('ClubChartDataService', () => {
  let service: ClubChartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ClubChartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
