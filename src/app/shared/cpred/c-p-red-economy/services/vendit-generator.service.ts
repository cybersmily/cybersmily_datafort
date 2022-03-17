import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { VenditChart, VenditItem } from './../models';
import { DataService, JsonDataFiles } from './../../../services/file-services';
import { DiceService } from './../../../services/dice/dice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VenditGeneratorService {
  private _venditChart: VenditChart;

  constructor(private dice: DiceService, private dataService: DataService) { }

  generate(numOfVendits: number): Observable<Array<VenditItem>> {
    if (isNaN(numOfVendits) || numOfVendits < 1) {
      return of(new Array<VenditItem>());
    }
    if(this._venditChart) {
      return of(this.generateVendits(numOfVendits));
    } else {
      return this.dataService
        .GetJson(JsonDataFiles.CPRED_VENDIT_CHART_JSON)
        .pipe( map(data => {
          this._venditChart = data;
          return this.generateVendits(numOfVendits);
        }));
    }
  }

  generateVendits(numOfVendits: number): Array<VenditItem> {
    const vendits = new Array<VenditItem>();
    for( let i = 0; i < numOfVendits; i++) {
      const item = this.rollForVendit();
      const index = vendits.findIndex( i => i.name === item);
      if (index > -1) {
        vendits[index].count += 1;
      } else {
        vendits.push({count: 1, name: item});
      }
    }
    return vendits;
  }

  rollForVendit(): string {
    let roll = this.dice.generateNumber(1,6);
    switch(roll) {
      case 1:
      case 2:
      case 3:
        return this.rollForItem('food');
      case 4:
      case 5:
        return this.rollForItem('personal');
      default:
        return this.rollForItem('weird');
    }
  }

  rollForItem(category: string): string {
    const chart: Array<string> = this._venditChart[category];
    if (chart && chart.length > 0) {
      const roll = this.dice.generateNumber(0, chart.length - 1);
      return chart[roll];
    }
  }
}
