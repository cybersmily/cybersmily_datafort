import { JsonDataFiles } from './../../../services/file-services/json-data-files';
import { Observable, of, map } from 'rxjs';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { Injectable } from '@angular/core';
import { VehicleData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CP2020VehicleDataService {
  private _vehicleList: Array<VehicleData>;

  constructor(private dataService: DataService) {}

  get vehicleList(): Observable<Array<VehicleData>> {
    if (this._vehicleList) {
      return of(this._vehicleList);
    }
    return this.dataService
      .GetJson<Array<VehicleData>>(JsonDataFiles.CP2020_VEHICLE_DATA_LIST_JSON)
      .pipe(
        map((list) => {
          this._vehicleList = list;
          return this._vehicleList.sort((a, b) => a.name.localeCompare(b.name));
        })
      );
  }
}
