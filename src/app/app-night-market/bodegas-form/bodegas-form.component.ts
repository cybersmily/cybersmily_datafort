import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { BodegasItem } from '../models/bodegas-item';

@Component({
  selector: 'cs-bodegas-form',
  templateUrl: './bodegas-form.component.html',
  styleUrls: ['./bodegas-form.component.css']
})
export class BodegasFormComponent implements OnInit {
  faDice = faDice;

  bodegasChart: Array<BodegasItem>;

  owner: string;
  customer1: string;
  customer2: string;

  constructor(private dataService: DataService, private dice: DiceService) { }

  ngOnInit(): void {
    this.dataService.GetJson(JsonDataFiles.CPRED_BODEGAS_CHART_JSON)
    .subscribe( data => {
      this.bodegasChart = data;
    });
  }

  generate() {
    const max = this.bodegasChart.length - 1;
    let roll = this.dice.generateNumber(0, max);
    this.owner = this.bodegasChart[roll].owner;
    roll = this.dice.generateNumber(0, max);
    this.customer1 = this.bodegasChart[roll].customer1;
    roll = this.dice.generateNumber(0, max);
    this.customer2 = this.bodegasChart[roll].customer2;
  }

}
