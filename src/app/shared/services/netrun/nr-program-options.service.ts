import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NrProgramOption } from './../../models/netrun';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NrProgramOptionsService {

  private _classes: Array<NrProgramOption> = new Array<NrProgramOption>();
  private _options: Array<NrProgramOption> = new Array<NrProgramOption>();

  constructor(private data: DataService) { }

  get classes(): Observable<Array<NrProgramOption>> {
    if (this._classes.length < 1 ){
      return this.data.GetJson('/json/apps/nrmap/program.json')
      .pipe(
        map( data => {
        this._classes = data.classes;
        this._options = data.options;
        return this._classes;
      }));
    } else {
      return of(this._classes);
    }
  }

  get options(): Observable<Array<NrProgramOption>> {
    if (this._classes.length < 1 ){
      return this.data.GetJson('/json/apps/nrmap/program.json')
      .pipe(
        map( data => {
        this._classes = data.classes;
        this._options = data.options;
        return this._options;
      }));
    } else {
      return of(this._options);
    }
  }
}
