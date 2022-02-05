import { map } from 'rxjs/operators';
import { JsonDataFiles, DataService } from './../../../services/file-services';
import { Observable, of } from 'rxjs';
import { Cp2020MartialArt } from './../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MartialArtsDataService {

  private _martialArts: Array<Cp2020MartialArt>;

  constructor(private dataService: DataService) { }

  get martialArtsBonuses(): Observable<Array<Cp2020MartialArt>> {
    if (this._martialArts) {
      return of( this._martialArts);
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_MARTIAL_ARTS_LIST_JSON)
    .pipe( map( martialArtList => {
      this._martialArts = martialArtList;
      return martialArtList;
    }));

  }
}
