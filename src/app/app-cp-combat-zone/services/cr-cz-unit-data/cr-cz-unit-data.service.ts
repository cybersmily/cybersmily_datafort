import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DataService, JsonDataFiles } from '../../../shared/services/file-services';
import { iCrCzCharacterCard, iCrCzCharacterCardData } from '../../models/cr-cz-character-card';

@Injectable({
  providedIn: 'root'
})
export class CrCzUnitDataService {
  private _unitList: Array<iCrCzCharacterCardData>;

  constructor(private dataService: DataService) { }

  get unitList(): Observable<Array<iCrCzCharacterCardData>> {
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
