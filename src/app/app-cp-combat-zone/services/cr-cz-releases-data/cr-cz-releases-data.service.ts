import { Injectable } from '@angular/core';
import {
  DataService,
  JsonDataFiles,
} from '../../../shared/services/file-services';
import { map, Observable, of } from 'rxjs';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CrCzReleasesDataService {
  private _releasesList: Array<KeyValue<string, string>>;

  constructor(private dataService: DataService) {}

  get releaseList(): Observable<Array<KeyValue<string, string>>> {
    if (this._releasesList) {
      return of(this._releasesList);
    } else {
      return this.dataService
        .GetJson(JsonDataFiles.COMBATZONE_RELEASES_LIST_JSON)
        .pipe(
          map((data: Array<KeyValue<string, string>>) => {
            this._releasesList = [...data];
            return this._releasesList;
          })
        );
    }
  }

  GetFullReleaseNames(
    abbreviations: Array<string>
  ): Observable<Array<string>> {
    return this.releaseList.pipe(
      map((data: Array<KeyValue<string, string>>) => {
        const results = Array<string>();
        data.forEach((kv) => {
          if (abbreviations.includes(kv.key)) {
            results.push(kv.value);
          }
        });
        return results;
      })
    );
  }
}
