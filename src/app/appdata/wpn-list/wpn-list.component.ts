import { WeaponDataService } from './../../shared/services/data/weapon-data.service';
import { DataWeapon } from './../../shared/models/weapon/data-weapon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-wpn-list',
  templateUrl: './wpn-list.component.html',
  styleUrls: ['./wpn-list.component.css']
})
export class WpnListComponent implements OnInit {

  wpnList: Array<DataWeapon> = new Array<DataWeapon>();

  filters = {
    category: '',
    subcategory: '',
    name: '',
    type: '',
    source: '',
    conc: '',
    avail: '',
    rel: ''
  };

  constructor(private wpnDataService: WeaponDataService) { }

  ngOnInit(): void {
    this.wpnDataService.WeaponList.subscribe(list => {
      this.wpnList = list;
    });
  }

}
