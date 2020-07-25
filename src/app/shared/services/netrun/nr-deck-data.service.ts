import { DataService } from './../data.service';
import { map } from 'rxjs/operators';
import { JsonDataFiles } from './../../json-data-files';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { NrDeckData } from '../../models/netrun/nr-deck-data';

@Injectable({
  providedIn: 'root'
})
export class NrDeckDataService {
  private _deckData: NrDeckData;

  constructor(private file: DataService) { }

  getDeckData(): Observable<NrDeckData> {
    if (this._deckData) {
      return of(this._deckData);
    }
    return this.file
    .GetJson(JsonDataFiles.CP2020_DECK_DATA_JSON)
    .pipe(
      map( d => {
        this._deckData = d;

        this._deckData.options = this._deckData.options.sort( (a, b) => ( a.name > b.name) ? 1 : -1);
        return d;
      })
    );
  }
}
