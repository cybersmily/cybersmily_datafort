import { SeoService } from './../../shared/services/seo/seo.service';
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

  constructor(private wpnDataService: WeaponDataService, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'Cyberpunk 2020 Master Weapon List',
      '2020-09, Cybersmily\'s Datafort Cyberpunk 2020 Master Weapon List is a complied list of weapons from Cyberpunk 2020 source books.'
    );
    this.wpnDataService.WeaponList.subscribe(list => {
      this.wpnList = list;
    });
  }

}
