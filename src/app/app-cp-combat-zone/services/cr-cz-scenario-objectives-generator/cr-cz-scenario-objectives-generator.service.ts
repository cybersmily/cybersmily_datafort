import { CrCzObjectiveDataService } from './../cr-cz-objective-data/cr-cz-objective-data.service';
import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { iCrCzObjectiveCard } from './../../models/cr-cz-objective-card';

@Injectable({
  providedIn: 'root'
})
export class CrCzScenarioObjectivesGeneratorService {

  constructor(private objectiveListService: CrCzObjectiveDataService) { }

  getRandomObjectives(count: number, faction: string, acheived: Array<string>): Observable<Array<iCrCzObjectiveCard>> {
    return this.objectiveListService.objectiveList.pipe(
      map( (data) => {
        return data.filter(obj => obj.faction === faction && !acheived.includes(obj.name) && obj.name !== 'wounded leader');
      }),
      map( (data) => {
        return this.shuffleObjectives(data, count);
      }));
  }

  private shuffleObjectives(array: Array<iCrCzObjectiveCard>, count: number): Array<iCrCzObjectiveCard> {
     for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array.slice(0,count);
  }
}
