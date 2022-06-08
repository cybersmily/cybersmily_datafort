import { JsonDataFiles } from './../file-services/json-data-files';
import { BehaviorSubject, Observable, retry, map } from 'rxjs';
import { DataService } from './../file-services/dataservice/data.service';
import { Injectable } from '@angular/core';
import { CorporationData } from '../../models/corporation/corporation-data';

@Injectable({
  providedIn: 'root',
})
export class CorporationDataService {
  private _corporations: BehaviorSubject<Array<CorporationData>> =
    new BehaviorSubject([]);

  corporations: Observable<Array<CorporationData>> =
    this._corporations.asObservable();

  constructor(private dataService: DataService) {
    this.dataService
      .GetJson<Array<CorporationData>>(JsonDataFiles.DATA_LIST_CORPORATIONS)
      .subscribe((data) => this._corporations.next(data));
  }
}
