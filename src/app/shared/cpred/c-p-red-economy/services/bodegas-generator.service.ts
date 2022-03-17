import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BodegasItem } from './../models';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService, JsonDataFiles } from './../../../services/file-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodegasGeneratorService {
  private _bodegasChart: Array<BodegasItem>;

  constructor(private dataService: DataService, private dice: DiceService) { }

  generate(): Observable<BodegasItem> {
    if (this._bodegasChart) {
      return of(this.generateBodegas(this._bodegasChart));
    } else {
      return this.dataService
        .GetJson(JsonDataFiles.CPRED_BODEGAS_CHART_JSON)
        .pipe(
          map(data => {
            this._bodegasChart = data;
            return this.generateBodegas(this._bodegasChart);
          }));
    }
  }

  private generateBodegas(chart: Array<BodegasItem>): BodegasItem {
    const result = { owner: '', customer1: '', customer2: '' };
    const max = chart.length - 1;
    let roll = this.dice.generateNumber(0, max);
    result.owner = chart[roll].owner;
    roll = this.dice.generateNumber(0, max);
    result.customer1 = chart[roll].customer1;
    roll = this.dice.generateNumber(0, max);
    result.customer2 = chart[roll].customer2;
    return result;
  }
}
