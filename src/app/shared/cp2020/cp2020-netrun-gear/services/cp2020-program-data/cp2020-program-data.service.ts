import { ProgramData } from './../../models/program-data';
import {
  DataService,
  JsonDataFiles,
} from './../../../../services/file-services';
import { Cp2020Program, Program, ProgramOption } from './../../models';
import { BehaviorSubject, Observable, of, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020ProgramDataService {
  private _classes: Array<ProgramOption>;
  private _options: Array<ProgramOption>;
  private _programs: Array<Cp2020Program>;

  constructor(private dataService: DataService) {}

  get cp2020Programs(): Observable<Array<Cp2020Program>> {
    if (!this._programs) {
      return this._setData().pipe(
        map((data) => {
          console.log('refPrograms', this._programs);
          return this._programs;
        })
      );
    }
    console.log('refPrograms', this._programs);
    return of(this._programs);
  }

  get cp2020ProgramOptions(): Observable<Array<ProgramOption>> {
    if (this._options === null) {
      return this._setData().pipe(
        map((data) => {
          return this._options;
        })
      );
    }
    return of(this._options);
  }

  get cp2020ProgramClasses(): Observable<Array<ProgramOption>> {
    if (this._classes === null) {
      return this._setData().pipe(
        map((data) => {
          return this._classes;
        })
      );
    }
    return of(this._classes);
  }

  private _setData(): Observable<ProgramData> {
    return this.dataService
      .GetJson<ProgramData>(JsonDataFiles.CP2020_PROGRAM_DATA_JSON)
      .pipe(
        map((data) => {
          console.log('program data json', data);
          this._classes = data.classes;
          this._options = data.options;
          this._programs = this._createProgramList(
            data.programs,
            this._classes
          );
          return data;
        })
      );
  }

  private _createProgramList(
    programs: Array<Program>,
    classes: Array<ProgramOption>
  ): Array<Cp2020Program> {
    return programs.map((prog: any) => {
      const cls = {
        ...classes.find(
          (c) => c.name.toLowerCase() === prog.class?.toLowerCase()
        ),
      };
      const opts = prog.options?.map((opt: string) =>
        this._options.find((o) => o.name.toLowerCase() === opt.toLowerCase())
      );
      const program = new Cp2020Program(prog);
      program.class = cls;
      program.options = [...opts];
      return program;
    });
  }
}
