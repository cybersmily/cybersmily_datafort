import { JsonDataFiles } from './../../../../services/file-services/json-data-files';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { Cp2020Program } from './../../models/cp2020-program';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cp2020ProgramsDataService {

  private _programList: Array<Cp2020Program>;

  constructor(private dataService: DataService) { }

  get programList(): Observable<Array<Cp2020Program>> {
    if(this._programList) {
      return of(this._programList);
    }
    return this.dataService.GetJson<Array<any>>(JsonDataFiles.CP2020_PROGRAM_LIST_JSON)
    .pipe(map(data => {
      this._programList = [...data].map(prog => new Cp2020Program(prog) );
      return this._programList;
    }));
  }
}
