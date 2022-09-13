import { FixerChartItem } from './../../models/fixerchartitem';
import { FixerCharts } from './../../models/fixercharts';
import { take, map, Observable, of } from 'rxjs';
import {
  DataService,
  JsonDataFiles,
} from './../../../../services/file-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020FixerContactDataService {
  private _areaList: Array<string>;
  private _contactList: Array<string>;

  get areaLists(): Observable<Array<string>> {
    if (this._areaList) {
      return of(this._areaList);
    }
    return this.load().pipe(map((data) => data.areaList));
  }

  constructor(private dataService: DataService) {}

  private load(): Observable<{
    areaList: Array<string>;
    contactList: Array<string>;
  }> {
    return this.dataService
      .GetJson(JsonDataFiles.CP2020_FIXER_CONTACTS_JSON)
      .pipe(
        take(1),
        map((data: FixerCharts) => {
          const contactData = {
            areaList: new Array<string>(),
            contactList: new Array<string>(),
          };
          data.fields.forEach((area) => {
            for (let i = 0; i < area.weight; i++) {
              contactData.areaList.push(area.value);
            }
          });
          data.types.forEach((type) => {
            for (let i = 0; i < type.weight; i++) {
              contactData.contactList.push(type.value);
            }
          });
          this._areaList = [...contactData.areaList];
          this._contactList = [...contactData.contactList];
          return contactData;
        })
      );
  }
}
