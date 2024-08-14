import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DataService, JsonDataFiles } from '../../../shared/services/file-services';
import { iCrCzUnitCard, iCrCzUnitCardData } from '../../models/cr-cz-unit-card';

@Injectable({
  providedIn: 'root'
})
export class CrCzUnitDataService {
  private _unitList: Array<iCrCzUnitCardData>;

  constructor(private dataService: DataService) { }

  get unitList(): Observable<Array<iCrCzUnitCardData>> {
    if(this._unitList) {
      return of(this._unitList);
    } else {
      return this.dataService
      .GetJson(JsonDataFiles.COMBATZONE_UNIT_LIST_JSON)
      .pipe(
        map( (data:any) => {
          this._unitList = [...data.units];
          return this._unitList;
        })
      );
    }
  }
}
