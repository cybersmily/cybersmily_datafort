import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ClubChartDataService } from './club-chart-data.service';

describe('ClubChartDataService', () => {
  let service: ClubChartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(ClubChartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
