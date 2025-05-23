import { iCrCzObjectiveCard } from './../../models/cr-cz-objective-card';
import { Injectable } from '@angular/core';
import { DataService, JsonDataFiles } from '../../../shared/services/file-services';
import { filter, map, Observable, of } from 'rxjs';
import { iCrCzObjectiveCard } from '../../models/cr-cz-objective-card';

@Injectable({
  providedIn: 'root'
})
export class CrCzObjectiveDataService {

  private _objectiveList: Array<iCrCzObjectiveCard>;

  constructor(private dataService: DataService) { }

  get objectiveList(): Observable<Array<iCrCzObjectiveCard>> {
    if(this._objectiveList) {
      return of(this._objectiveList);
    } else {
      return this.dataService
        .GetJson(JsonDataFiles.COMBATZONE_OBJECTIVES_LIST_JSON)
        .pipe( map( (data: any) => {
          this._objectiveList = [...data.objectives];
          return this._objectiveList;
        }));
    }
  }

  getRandomObjectives(count: number, faction: string, acheived: Array<string>): Observable<Array<iCrCzObjectiveCard>> {
    const objectives = [];
    this.objectiveList.pipe(
      map( (data) => data.filter(obj => obj.faction === faction && !acheived.includes(obj.name))),
      map( (data) => this.shuffleObjectives(data, count))
     )
    return of(objectives);
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
