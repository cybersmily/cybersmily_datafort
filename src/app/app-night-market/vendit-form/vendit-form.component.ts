import { VenditItem } from './../models/vendit-item';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { VenditChart } from './../models/vendit-chart';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-vendit-form',
  templateUrl: './vendit-form.component.html',
  styleUrls: ['./vendit-form.component.css']
})
export class VenditFormComponent implements OnInit {
  faDice = faDice;

  venditChart: VenditChart;
  numOfVendits: number = 1;
  vendits: Array<VenditItem> = new Array<VenditItem>();

  constructor(private dataService: DataService, private dice: DiceService) { }

  ngOnInit(): void {
    this.dataService.GetJson(JsonDataFiles.CPRED_VENDIT_CHART_JSON)
    .subscribe((data: VenditChart) => {
      this.venditChart = data;
    });
  }

  generateVendits() {
    this.vendits = new Array<VenditItem>();
    for( let i = 0; i < this.numOfVendits; i++) {
      const item = this.rollForVendit();
      const index = this.vendits.findIndex( i => i.name === item);
      if (index > -1) {
        this.vendits[index].count += 1;
      } else {
        this.vendits.push({count: 1, name: item});
      }
    }
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
    const chart: Array<string> = this.venditChart[category];
    if (chart && chart.length > 0) {
      const roll = this.dice.generateNumber(0, chart.length - 1);
      return chart[roll];
    }
  }

}
