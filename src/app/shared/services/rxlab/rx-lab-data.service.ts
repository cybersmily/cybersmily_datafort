import { JsonDataFiles } from './../file-services';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CpDrugEffect } from '../../models/drug/cp-drug';
import { DataService } from './../file-services';

@Injectable({
  providedIn: 'root'
})
export class RxLabDataService {

  private _effects: Array<CpDrugEffect>;
  private _sideEffects: Array<CpDrugEffect>;

  constructor(private dataService: DataService) {}

  get effects(): Observable<Array<CpDrugEffect>> {
    if (this._effects) {
      return of(this._effects);
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_DRUG_EFFECTS_JSON)
    .pipe( map( data => {
      this._effects = data.effects;
      this._sideEffects = data.sideEffects;
      return this._effects;
    }));
  }

  get sideEffects(): Observable<Array<CpDrugEffect>> {
    if (this._sideEffects) {
      return of(this._sideEffects);
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_DRUG_EFFECTS_JSON)
    .pipe( map( data => {
      this._effects = data.effects;
      this._sideEffects = data.sideEffects;
      return this._sideEffects;
    }));
  }
}
