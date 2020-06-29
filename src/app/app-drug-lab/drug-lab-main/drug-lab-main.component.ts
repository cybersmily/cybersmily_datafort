import { SeoService } from './../../shared/services/seo/seo.service';
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

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Drug Lab',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Drug Lab is an application to generate drugs for the game using the rules from the basic book.'
    );
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
