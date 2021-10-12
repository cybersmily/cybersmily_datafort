import { JsonDataFiles } from './../file-services';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NrProgramOption } from '../../cp2020/cp2020-netrun-gear/models';
import { DataService } from './../file-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NrProgramOptionsService {

  private _classes: Array<NrProgramOption> = new Array<NrProgramOption>();
  private _options: Array<NrProgramOption> = new Array<NrProgramOption>();

  constructor(private data: DataService) { }

  get classes(): Observable<Array<NrProgramOption>> {
    if (this._classes.length < 1 ) {
      return this.getJson()
      .pipe(
        map( data => {
        return this._classes;
      }));
    } else {
      return of(this._classes);
    }
  }

  get options(): Observable<Array<NrProgramOption>> {
    if (this._classes.length < 1 ) {
      return this.getJson()
      .pipe(
        map( data => {
        return this._options;
      }));
    } else {
      return of(this._options);
    }
  }

  getJson(): Observable<Array<NrProgramOption>> {
    return this.data.GetJson(JsonDataFiles.CP2020_PROGRAM_OPTIONS_JSON)
      .pipe(
        map( data => {
        this._classes = data.classes;
        this._options = data.options;
        return data;
      }));
  }
}
