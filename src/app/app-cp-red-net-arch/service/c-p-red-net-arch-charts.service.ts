import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { CPRedArchCharts } from './../models/c-p-red-arch-charts';
import { DataService } from './../../shared/services/file-services';
import { Injectable } from '@angular/core';
import { NetArchProgram } from '../models';
import { CPRedDemon } from '../models/c-p-red-demon';

@Injectable({
  providedIn: 'root'
})
export class CPRedNetArchChartsService {
  private _architect: CPRedArchCharts;

  constructor(private dataService: DataService) { }

  private loadCharts() {
  }

  get charts(): Observable<CPRedArchCharts> {
    if( this._architect) {
      return of(this._architect);
    } else {
      return this.dataService
      .GetJson(JsonDataFiles.CPRED_NET_ARCH_CHARTS_JSON)
      .pipe(
        map(data => {
          this._architect = data;
          return this._architect;
        })
      );

    }
  }

  get programs(): Observable<Array<NetArchProgram>> {
    return this.charts.pipe(map( data => data.programs));
  }

  getProgram(name: string): Observable<NetArchProgram> {
    return this.programs
    .pipe(
      map( data =>
        data.find( prog =>
          prog.name.toLocaleLowerCase() === name.toLocaleLowerCase())[0]
     ));
  }

  get demons(): Observable<Array<CPRedDemon>> {
    return this.charts.pipe(map( data => data.demons));
  }

  getDemon(name: string): Observable<CPRedDemon> {
    return this.demons
    .pipe(
      map( data =>
        data.find( demon =>
          demon.name.toLocaleLowerCase() === name.toLocaleLowerCase())[0]
     ));
  }


}
