import { take, takeLast } from 'rxjs';
import { DataService } from './../../shared/services/file-services';
import { CPRedNetArchChartsService } from './c-p-red-net-arch-charts.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DiceService } from './../../shared/services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { CPRedNetArchService } from './c-p-red-net-arch.service';

describe('CPRedNetArchService', () => {
  let service: CPRedNetArchService;
  let dice: DiceService;
  let chartService: CPRedNetArchChartsService;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DiceService,
        DataService,
        CPRedNetArchChartsService,
        provideHttpClient(withInterceptorsFromDi())
    ]
});
    dataService = TestBed.inject(DataService);
    chartService = new CPRedNetArchChartsService(dataService);
    dice = TestBed.inject(DiceService);
    service = new CPRedNetArchService(dice, chartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate architect', () => {
    service.generateArch(false, false, 0);
    service.architect
    .pipe(takeLast(1)) // initiate architect is null, want second one after generation completes.
    .subscribe( arch => {
      expect(arch).toBeTruthy();
    });
  });
});
