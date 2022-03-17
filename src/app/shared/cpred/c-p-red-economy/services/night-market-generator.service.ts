import { CPRedPriceCategoryLookup } from './../../models/c-p-red-price-category-lookup';
import { map } from 'rxjs/operators';
import { JsonDataFiles, DataService } from './../../../services/file-services';
import { DiceService } from './../../../services/dice/dice.service';
import { NightMarketListing, NightMarketCategory, NightMarketEntry } from '../models';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NightMarketGeneratorService {
  private _charts: Array<NightMarketCategory>;
  private _categoriesUsed = new Array<string>();
  private DEFAULT_ITEM_COUNT = 10;

  constructor(private dataService: DataService, private diceService: DiceService) { }

  generate(numberOfItems?: number): Observable<Array<NightMarketListing>> {
    if(this._charts) {
      return of(this.getList(numberOfItems));
    } else {
      return this.dataService.GetJson(JsonDataFiles.CPRED_NIGHTMARKET_CHART_JSON)
      .pipe( map(data => {
        this._charts = data.charts;
        return this.getList(numberOfItems);
      }));
    }
  }

  private getList(numberOfItems?: number): Array<NightMarketListing> {
    const itemList = new Array<NightMarketListing>();
    // add 2 NM listings as per rules
    if(numberOfItems) {
      itemList.push(this.rollTable(numberOfItems));
      itemList.push(this.rollTable(numberOfItems));
    } else {
      itemList.push(this.rollTable(this.diceService.generateNumber(1, this.DEFAULT_ITEM_COUNT)));
      itemList.push(this.rollTable(this.diceService.generateNumber(1, this.DEFAULT_ITEM_COUNT)));
    }
    this._categoriesUsed = new Array<string>();
    return itemList;
  }

  private rollTable(numberOfItems: number ): NightMarketListing {
    const result: NightMarketListing = {category: '', items: new Array<string>()};
    // get category that hasn't been rolled yet.
    const nmCharts = this._charts.filter( nm => !this._categoriesUsed.includes(nm.name));
    const chart = this._charts[this.roll(nmCharts.length - 1)];
    this._categoriesUsed.push(chart.name); // make sure each category is unique
    result.category = chart.name;
    result.items = this.generateItems(numberOfItems, chart);
    return result;
  }

  private generateItems(numberOfItems: number, chart: NightMarketCategory): Array<string> {
    const results = new Array<string>();
    const count = numberOfItems > chart.chart.length ? chart.chart.length : ( numberOfItems < 1 ? 1: numberOfItems);
    let items = chart.chart.slice();
    for (let i = 0; i < count; i++) {
      const roll = this.roll(items.length - 1);
      results.push(this.formatItem(items[roll]));
      items.splice(roll, 1); // remove the item so
    }
    return results.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));;
  }

  private roll(maxNum: number): number {
    return this.diceService.generateNumber(0,maxNum);
  }

  private formatItem(item:NightMarketEntry): string {
    const price = item.price ? ` ${item.price}eb (${CPRedPriceCategoryLookup.priceCategoryLookup(item.price)})` : '';
    return `${item.name}${price}`;
  }

}
