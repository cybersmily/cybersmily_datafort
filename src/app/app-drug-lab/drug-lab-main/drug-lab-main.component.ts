import { Cp2020Drug, CpDrug, Cp2020DrugList } from './../../shared/models/drug';
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
  key = 'CS_LabList';

  constructor() { }

  ngOnInit() {
    if ( window.localStorage[this.key]) {
      const items: Array<CpDrug> = JSON.parse(window.localStorage[this.key]);
       this.list = new Cp2020DrugList(items);
     }
  }

  add(item: Cp2020Drug) {
    this.list.add(item);
    window.localStorage[this.key] = JSON.stringify(this.list.items);
  }

  delete(index: number) {
    console.log(index);
    this.list.remove(index);
    window.localStorage[this.key] = JSON.stringify(this.list.items);
  }

  resetDrugList(reset: boolean) {
    if (reset) {
      this.list = new Cp2020DrugList();
      window.localStorage.removeItem(this.key);
    }
  }

}
