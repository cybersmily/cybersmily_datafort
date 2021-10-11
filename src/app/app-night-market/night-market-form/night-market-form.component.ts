import { MarketsToPDF } from './../models/marketsToPDF';
import { CPRedPriceCategoryLookup } from './../../shared/cpred/models/c-p-red-price-category-lookup';
import { faDice, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { NightMarketListing, NightMarketCategory } from '../../shared/cpred/models/night-market-chart';
import { DataService } from './../../shared/services/file-services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-night-market-form',
  templateUrl: './night-market-form.component.html',
  styleUrls: ['./night-market-form.component.css']
})
export class NightMarketFormComponent implements OnInit {
  faDice = faDice;
  faFilePdf = faFilePdf;

  charts: Array<NightMarketCategory>;
  currChartIndex: number = -1;
  randomRollNoItems: boolean = true;
  numberOfItems: number = 5;

  itemList: Array<NightMarketListing> = new Array<NightMarketListing>();

  constructor(private dataService: DataService, private diceService: DiceService) { }

  ngOnInit(): void {
    this.dataService.GetJson(JsonDataFiles.CPRED_NIGHTMARKET_CHART_JSON)
    .subscribe(data => {
      this.charts = data.charts;
    });
  }

  generate() {
    if (this.charts) {
      this.itemList = new Array<NightMarketListing>();
      this.itemList.push(this.rollTable());
      this.itemList.push(this.rollTable());
    }
  }

  rollTable(): NightMarketListing {
    const numberOfItems = (this.randomRollNoItems) ? this.diceService.generateNumber(1, 10) : this.numberOfItems;
    const result: NightMarketListing = {category: '', items: new Array<string>()};
    let roll = this.diceService.generateNumber(0, this.charts.length - 1);
    while (this.currChartIndex === roll) {
      roll = this.diceService.generateNumber(0, this.charts.length - 1);
    }
    const chart = this.charts[roll];
    result.category = chart.name;
    this.currChartIndex = roll;
    const numOfItems = numberOfItems > chart.chart.length ? chart.chart.length : ( numberOfItems < 1 ? 1: numberOfItems);
    let items = chart.chart.slice();
    for (let i = 0; i < numOfItems; i++) {
      roll = this.diceService.generateNumber(0, items.length - 1);
      const item = items[roll];
      let output = item.name;
      if(item.price) {
        output += ` ${item.price}eb (${CPRedPriceCategoryLookup.priceCategoryLookup(item.price)})`;
      }
      result.items.push(output);
      items.splice(roll, 1);
    }

    result.items.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      return a > b ? 1 : b > a ? -1 : 0;
    });
    return result;
  }

  saveAsPDF() {
    MarketsToPDF.createNighMarketPDF(this.itemList);
  }

}
