import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { CmbtTrckOppChartService } from './cmbt-trck-opp-chart.service';

describe('CmbtTrckOppChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      DiceService,
      DataService
    ]
  }));

  it('should be created', () => {
    const service: CmbtTrckOppChartService = TestBed.get(CmbtTrckOppChartService);
    expect(service).toBeTruthy();
  });
});
