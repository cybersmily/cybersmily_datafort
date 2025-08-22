import { DiceService } from './../../../../services/dice/dice.service';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { ClubChartDataService } from './../club-chart-data/club-chart-data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClubGeneratorService } from './club-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClubGeneratorService', () => {
  let service: ClubGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ClubChartDataService, DataService, DiceService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ClubGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
