import { JsonDataFiles } from './../../json-data-files';
import { LifepathEthnicityEntry, LifepathEthnicity } from './../../models/lifepath';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { DiceService } from '../dice/dice.service';

@Injectable({
  providedIn: 'root'
})
export class EthnicityGeneratorService {

  ethnicityChart: any;

  constructor(private dataService: DataService, private diceService: DiceService) { }

  /**
   * GetChart()
   * This will get the ethnicity chart of the source provided.
   * Default source is CP2020.
   * @param source - name of the source book for the chart.
   */
  GetChart(source: string): Observable<LifepathEthnicityEntry[]> {
    return this.getChartData()
    .pipe( map( data => {
      if (!data[source]) {
        source = 'CP2020';
      }
      return data[source];
    }));
  }

  GenerateEthnicity(source: string): Observable<LifepathEthnicity[]> {
    return this.getChartData()
    .pipe( map( data => {
      if (!data[source]) {
        source = 'CP2020';
      }
      const results = new Array<LifepathEthnicity>();
      results.push(this.CreateEthinicity(data[source], source, false));
      // if polygot, then roll twice
      if (results[0].name === 'Polygot') {
        results[0] = this.CreateEthinicity(data[source], source, true);
        let second: LifepathEthnicity;
        // don't repeat the ethnicity
        do {
          second = this.CreateEthinicity(data[source], source, true);
        } while (results[0].name === second.name);
        results.push(second);
      }
      return results;
    }));
  }

  private CreateEthinicity(chart: LifepathEthnicityEntry[], source: string, isPolygot: boolean): LifepathEthnicity {
    const result: LifepathEthnicity = {name: '', language: ''};
    const length = (isPolygot) ? chart.length - 2 : chart.length - 1;
    const ethRoll = this.diceService.generateNumber(0, length);
    const ethnicity: LifepathEthnicityEntry = chart[ethRoll];
    result.name = ethnicity.name;
    const langRoll = this.diceService.generateNumber(0, ethnicity.languages.length - 1);
    result.language = ethnicity.languages[langRoll];
    return result;
  }

  /**
   * getData()
   * This method will get the ethnicity charts from the json file.
   */
  private getChartData(): Observable<any> {
    if (!this.ethnicityChart) {
      return this.dataService
      .GetJson(JsonDataFiles.CP2020_LIFEPTAH_ETHNICITY_JSON)
      .pipe(
        map (data => this.ethnicityChart = data)
      );
    }
    return of(this.ethnicityChart);
  }
}
