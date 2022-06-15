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
          const club = {} as Club;
          club.name = '';
          Object.keys(chart).forEach((key) => {
            club[key] = this.dice.rollRandomItem(chart[key]);
          });
          club.summary = `${club.themes} ${club.types} ${club.ownership}. It has ${club.music} for music and known for its ${club.gimmicks}. ${club.name} can hold ${club.capacity} people. The ${club.types} is ${club.occupancy}/${club.regulars} regulars, with ${club.wait} wait. The crowd is ${club.crowd} and ${club.attitude} about new comers.The ${club.types} is ${club.membersonly} with a ${club.dresscode} dresscode and has ${club.security} security. The ${club.types} has ${club.privacy} for privacy.`;
          club.summary =
            club.summary[0].toUpperCase() + club.summary.substring(1);

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
