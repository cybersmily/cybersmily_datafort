import { Injectable } from '@angular/core';
import { DataService, JsonDataFiles } from '../../../shared/services/file-services';
import { map, Observable, of } from 'rxjs';
import { iCrCzNrProgramCard } from '../../models/cr-cz-nr-program-card';

@Injectable({
  providedIn: 'root'
})
export class CrCzProgramDataService {

  private _programList: Array<iCrCzNrProgramCard>;

  constructor(private dataService: DataService) { }

  get programList(): Observable<Array<iCrCzNrProgramCard>> {
    if(this._programList) {
      return of(this._programList);
    } else {
      return this.dataService
        .GetJson(JsonDataFiles.COMBATZONE_PROGRAMS_LIST_JSON)
        .pipe( map( (data: any) => {
          this._programList = [...data.programs];
          return this._programList;
        }));
    }
  }
}
