import { map } from 'rxjs/operators';
import { JsonDataFiles } from './../../json-data-files';
import { Observable, of } from 'rxjs';
import { Cp2020MartialArt } from './../../models/skill/cp2020-martial-art';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MartialArtsDataService {

  private _martialArts: Array<Cp2020MartialArt>;

  constructor(private dataService: DataService) { }

  getMartialArtsList(): Observable<Array<Cp2020MartialArt>> {
    if (this._martialArts) {
      return of( this._martialArts);
    }
    return this.dataService.GetJson(JsonDataFiles.CP2020_MARTIAL_ARTS_LIST_JSON).pipe( map( martialArtList => {
      this._martialArts = martialArtList;
      return martialArtList;
    }));

  }
}
