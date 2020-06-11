import { Cp2020DrugList } from './../../shared/models/drug/cp2020-drug-list';
import { Cp2020Drug } from './../../shared/models/drug/cp2020-drug';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-drug-lab-main',
  templateUrl: './drug-lab-main.component.html',
  styleUrls: ['./drug-lab-main.component.css']
})
export class DrugLabMainComponent implements OnInit {

  selectedDrug: Cp2020Drug = new Cp2020Drug();
  list: Cp2020DrugList = new Cp2020DrugList();
  selectedIndex: number;

  constructor() { }

  ngOnInit() {
  }

  add(item: Cp2020Drug) {
    console.log(item);
    this.list.add(item);
    console.log(this.list);
  }

}
