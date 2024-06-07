import {
  DataService,
  JsonDataFiles,
} from './../../../../services/file-services';
import { Cp2020Program, Cp2020ProgramData, ProgramOption, ProgramData } from './../../models';
import { Observable, of, map, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020ProgramDataService {
  private _programData: BehaviorSubject< Cp2020ProgramData> = new BehaviorSubject<Cp2020ProgramData>(null);

  private _programs: BehaviorSubject<Array<Cp2020Program>> = new BehaviorSubject<Array<Cp2020Program>>([]);
  cp2020Programs:  Observable<Array<Cp2020Program>> = this._programs.asObservable();

  private _classes: BehaviorSubject<Array<ProgramOption>> = new BehaviorSubject<Array<ProgramOption>>([]);
  cp2020ProgramClasses: Observable<Array<ProgramOption>> = this._classes.asObservable();

  private _options: BehaviorSubject<Array<ProgramOption>> = new BehaviorSubject<Array<ProgramOption>>([]);
  cp2020ProgramOptions: Observable<Array<ProgramOption>> = this._options.asObservable();

  constructor(private dataService: DataService) {
    this._setData();
  }


  private _setData(): void {
    this.dataService
      .GetJson<Cp2020ProgramData>(JsonDataFiles.CP2020_PROGRAM_DATA_JSON)
      .subscribe((data) => {
          data.programs = this._createProgramList(
            data);
          this._programData.next(data);
          this._programs.next(data.programs);
          this._classes.next(data.classes);
          this._options.next(data.options);
        });
  }

  private _createProgramList(
    programData: ProgramData
  ): Array<Cp2020Program> {
    return programData.programs.map((prog: any) => {
      const cls = {
        ...programData.classes.find(
          (c) => c.name.toLowerCase() === prog.class?.toLowerCase()
        ),
      };
      const opts = prog.options?.map((opt: string) =>
        programData.options.find((o) => o.name.toLowerCase() === opt.toLowerCase())
      );

      const program = new Cp2020Program(prog);
      program.class = cls;
      program.options = [...opts];
      return program;
    });
  }
}
