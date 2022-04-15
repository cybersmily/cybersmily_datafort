import { JsonDataFiles } from './../file-services';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProgramOption } from '../../cp2020/cp2020-netrun-gear/models';
import { DataService } from './../file-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NrProgramOptionsService {
  private _classes: Array<ProgramOption> = new Array<ProgramOption>();
  private _options: Array<ProgramOption> = new Array<ProgramOption>();

  constructor(private data: DataService) {}

  get classes(): Observable<Array<ProgramOption>> {
    if (this._classes.length < 1) {
      return this.getJson().pipe(
        map((data) => {
          return this._classes;
        })
      );
    } else {
      return of(this._classes);
    }
  }

  get options(): Observable<Array<ProgramOption>> {
    if (this._classes.length < 1) {
      return this.getJson().pipe(
        map((data) => {
          return this._options;
        })
      );
    } else {
      return of(this._options);
    }
  }

  getJson(): Observable<{
    classes: Array<ProgramOption>;
    options: Array<ProgramOption>;
  }> {
    return this.data
      .GetJson<{
        classes: Array<ProgramOption>;
        options: Array<ProgramOption>;
      }>(JsonDataFiles.CP2020_PROGRAM_OPTIONS_JSON)
      .pipe(
        map((data) => {
          this._classes = data.classes;
          this._options = data.options;
          return data;
        })
      );
  }
}
