import { JsonDataFiles } from './../file-services';
import { LifepathDataMotivation } from './../../models/lifepath/lifepath-data-motivation';
import { LifepathMotivations } from './../../models/lifepath/lifepath-motivations';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DataService } from './../file-services';
import { DiceService } from '../dice/dice.service';

@Injectable({
  providedIn: 'root'
})
export class MotivationGeneratorService {

  motivationChart: any;

  constructor(private dataService: DataService, private diceService: DiceService) { }

  GenerateMotivation(source: string): Observable<LifepathMotivations> {
    return this.getChartData()
    .pipe( map( data => {
      const results = this.CreateMotivation(data, source);
      return results;
    }));
  }

  private CreateMotivation(chart: LifepathDataMotivation, source: string): LifepathMotivations {
    const result = new LifepathMotivations();
    let table = (chart.personality) ? this.getChart(chart.personality, source) : [''];
    let roll = this.diceService.generateNumber(0, table.length - 1);
    result.personality = table[roll];

    table = (chart.valuedperson) ? this.getChart(chart.valuedperson, source) : [''];
    roll = this.diceService.generateNumber(0, table.length - 1);
    result.valuedperson = table[roll];

    table = (chart.valuemost) ? this.getChart(chart.valuemost, source) : [''];
    roll = this.diceService.generateNumber(0, table.length - 1);
    result.valuemost = table[roll];

    table = (chart.feelaboutpeople) ? this.getChart(chart.feelaboutpeople, source) : [''];
    roll = this.diceService.generateNumber(0, table.length - 1);
    result.feelaboutpeople = table[roll];

    table = (chart.valuedpossesion) ? this.getChart(chart.valuedpossesion, source) : [''];
    roll = this.diceService.generateNumber(0, table.length - 1);
    result.valuedpossession = table[roll];

    return result;
  }

  private getChart(attribute: any, source): Array<string> {
    const chart = new Array<string>();
    if (attribute[source]) {
      return attribute[source];
    }
    // default should be cp2020
    return attribute['CP2020'];
  }

  /**
   * getData()
   * This method will get the ethnicity charts from the json file.
   */
  private getChartData(): Observable<any> {
    if (!this.motivationChart) {
      return this.dataService
      .GetJson(JsonDataFiles.CP2020_LIFEPTAH_MOTIVATION_JSON)
      .pipe(
        map (data => this.motivationChart = data.motivations)
      );
    }
    return of(this.motivationChart);
  }
}
