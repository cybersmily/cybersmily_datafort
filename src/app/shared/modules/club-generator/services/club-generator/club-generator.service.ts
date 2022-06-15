import { ClubNameGeneratorService } from './../clubb-name-generator/club-name-generator.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DiceService } from './../../../../services/dice/dice.service';
import { ClubChartDataService } from './../club-chart-data/club-chart-data.service';
import { Injectable } from '@angular/core';
import { Club, Clubber } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ClubGeneratorService {
  constructor(
    private clubChartData: ClubChartDataService,
    private dice: DiceService
  ) {}

  generateClub(count?: number): Observable<Array<Club>> {
    return this.clubChartData.clubCharts().pipe(
      map((chart) => {
        const result: Array<Club> = [];
        for (let i = 0; i < count; i++) {
          const club = {};
          club['name'] = '';
          Object.keys(chart).forEach((key) => {
            club[key] = this.dice.rollRandomItem(chart[key]);
          });
          result.push(club as Club);
        }
        return result;
      })
    );
  }

  generateClubber(count?: number): Observable<Array<Clubber>> {
    return of([]);
  }
}
