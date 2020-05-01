import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TitleValue } from './../../models/title-value';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SourcesDataService {

  sources = new Array<TitleValue>();

  constructor(private data: DataService) { }

  getSources(): Observable<Array<TitleValue>> {
    if (this.sources.length > 0) {
      return of(this.sources);
    }
    return this.data
      .GetJson('/json/apps/lifepath/sources.json')
      .pipe( map( (data) => {
        this.sources = data.sources;
        return this.sources;
      }));
  }
}
