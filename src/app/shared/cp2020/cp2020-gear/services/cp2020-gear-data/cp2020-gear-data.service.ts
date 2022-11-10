import { Cp2020Gear } from './../../models/cp2020-gear';
import { map } from 'rxjs/operators';
import { JsonDataFiles } from './../../../../services/file-services/json-data-files';
import { Observable, of } from 'rxjs';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020GearDataService {
  private _gearList: Array<Cp2020Gear>;

  constructor(private dataService: DataService) {}

  get gearList(): Observable<Array<Cp2020Gear>> {
    if (this._gearList) {
      return of(this._gearList);
    }
    return this.dataService
      .GetJson(JsonDataFiles.CP2020_GEAR_DATA_LIST_JSON)
      .pipe(
        map((data: Array<any>) => {
          this._gearList = [...data];
          return this._gearList;
        })
      );
  }
}
