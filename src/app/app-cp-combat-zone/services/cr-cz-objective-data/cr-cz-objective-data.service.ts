import { Injectable } from '@angular/core';
import { DataService, JsonDataFiles } from '../../../shared/services/file-services';
import { map, Observable, of } from 'rxjs';
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
}
