import { JsonDataFiles, DataService } from './../file-services';
import { LifepathDataStyles } from './../../models/lifepath/lifepath-data-styles';
import { LifepathAppearance } from './../../models/lifepath/lifepath-appearance';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DiceService } from './../dice/dice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleGeneratorService {
  stylesChart: any;

  constructor(private dataService: DataService, private diceService: DiceService) { }

  GenerateStyles(source: string): Observable<LifepathAppearance> {
    return this.getChartData()
    .pipe( map( data => {
      const results = this.CreateStyle(data, source);
      return results;
    }));
  }

  private CreateStyle(chart: LifepathDataStyles, source: string): any {
    const result = new LifepathAppearance();
    let table = (chart.clothes) ? this.getChart(chart.clothes, source) : [''];
    let roll = this.diceService.generateNumber(0, table.length - 1);
    result.clothes = table[roll];

    table = (chart.hairstyle) ? this.getChart(chart.hairstyle, source) : [''];
    roll = this.diceService.generateNumber(0, table.length - 1);
    result.hairstyle = table[roll];

    table = (chart.affectations) ? this.getChart(chart.affectations, source) : [''];
    roll = this.diceService.generateNumber(0, table.length - 1);
    result.affectations = table[roll];

    return result;
  }

  private getChart(attribute: any, source: string): Array<string> {
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
  private getChartData(): Observable<LifepathDataStyles> {
    if (!this.stylesChart) {
      return this.dataService
      .GetJson(JsonDataFiles.CP2020_LIFEPATH_STYLE_JSON)
      .pipe(
        map (data => this.stylesChart = data.styles)
      );
    }
    return of(this.stylesChart);
  }
}
