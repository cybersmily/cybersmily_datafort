import { CpRedLifepathSettings } from './../../models/cp-red-lifepath-settings';
import { CpRedLifepathCoreData } from './../../models/cp-red-lifepath-core-data';
import { CPRedLifepathJumpStartData } from './../../models/cp-red-lifepath-js-data';
import { CpRedLifepathCore } from './../../models/cp-red-lifepath-core';
import { CPRedLifepathJumpStart } from './../../models/cp-red-lifepath-js';
import { JsonDataFiles } from './../../../services/file-services/json-data-files';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CPRedLifePathService {

  private _lifePathData: any;
  settings: CpRedLifepathSettings;

  constructor(private dataService: DataService,
    private dice: DiceService) {
      this.settings = new CpRedLifepathSettings();
    }

  get LifePathJumpStartChart(): Observable<CPRedLifepathJumpStartData> {
    return this.loadData().pipe( map( data => {
      return data.jumpstart;
    }));
  }

  get LifePathCoreChart(): Observable<CpRedLifepathCoreData> {
    return this.loadData().pipe( map( data => {
      return data.corebook;
    }));
  }

  private loadData(): Observable<any> {
    if(this._lifePathData) {
      return of(this._lifePathData);
    }
    return this.dataService
    .GetJson(JsonDataFiles.CPRED_LIFEPATH_CHART_JSON)
    .pipe( map( (data) => {
      this._lifePathData = data;
      return this._lifePathData;
    }));
  }

  resetSettings(){}

  generateJumpStart(): Observable<CPRedLifepathJumpStart>{
    return this.LifePathJumpStartChart.pipe( map( chart => {
      const lifepath = new CPRedLifepathJumpStart();
      lifepath.background = this.rollOnChart(chart.background);
      lifepath.motivation = this.rollOnChart(chart.motivation);
      lifepath.goals = this.rollOnChart(chart.goals);
      lifepath.personality = this.rollOnChart(chart.personality);
      lifepath.friends = this.rollMultiChart(chart.friends,this.settings.numOfFriends);
      lifepath.enemies = this.rollMultiChart(chart.friends,this.settings.numOfEnemies);
      lifepath.romance = this.rollOnChart(chart.romance);
      return lifepath;
    }));
  }
  generateCore(role:string): Observable<CpRedLifepathCore>{
    return null;
  }

  private rollOnChart(chart: Array<any>): any {
    return chart[this.dice.generateNumber(0, chart.length - 1)];
  }

  private rollMultiChart(chart: Array<any>, die: string): Array<any> {
    const results = new Array<any>();
    const num: number = this.dice.rollMoreDice(die).total;
    for( let i = 0; i < num; i++) {
      results.push(this.rollOnChart(chart));
    }
    return results;
  }
}