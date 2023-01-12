import { Cp2020Cyberdeck } from './../../models/cp2020-cyberdeck';
import { JsonDataFiles } from './../../../../services/file-services/json-data-files';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { Observable, of, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020CyberdecksDataService {
  private _cyberdeckList: Array<Cp2020Cyberdeck>;

  constructor(private dataService: DataService) { }

  get cyberdeckList(): Observable<Array<Cp2020Cyberdeck>> {
    if(this._cyberdeckList) {
      return of(this._cyberdeckList);
    }
    return this.dataService
      .GetJson<any>(JsonDataFiles.CP2020_CYBERDECK_LIST_JSON)
      .pipe( map(data => {
        this._cyberdeckList = data.map((deck) => new Cp2020Cyberdeck(deck));
        return this._cyberdeckList;
      }));
  }
}
