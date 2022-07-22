import { DiceService } from './../../../../services/dice/dice.service';
import { GangChartData } from './../../models/gang-chart-data';
import { CpGang } from './../../models/cp-gang';
import { Observable, of, map } from 'rxjs';
import { GangDataService } from './../gang-data/gang-data.service';
import { Injectable } from '@angular/core';
import { Gang } from '../../models/gang';

@Injectable({
  providedIn: 'root',
})
export class GangGeneratorService {
  constructor(
    private gangChartService: GangDataService,
    private dice: DiceService
  ) {}

  generateGang(count?: number): Observable<Array<CpGang>> {
    if (count === null) {
      count = 1;
    }
    return this.gangChartService.GangDataCharts.pipe(
      map((charts) => {
        const gangs = new Array<CpGang>();
        for (let i = 0; i < count; i++) {
          gangs.push(this.rollGang(charts));
        }
        return gangs;
      })
    );
  }

  rollGang(charts: GangChartData): CpGang {
    const gang = new CpGang();
    return gang;
  }
}
