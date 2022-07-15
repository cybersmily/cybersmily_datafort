import { DiceService } from './../../../../services/dice/dice.service';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { ClubChartDataService } from './../club-chart-data/club-chart-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClubGeneratorService } from './club-generator.service';

describe('ClubGeneratorService', () => {
  let service: ClubGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClubChartDataService, DataService, DiceService],
    });
    service = TestBed.inject(ClubGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
