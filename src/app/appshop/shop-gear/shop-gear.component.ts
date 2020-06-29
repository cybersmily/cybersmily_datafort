import { SeoService } from './../../shared/services/seo/seo.service';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Gear } from '../../shared/models/gear';

@Component({
  selector: 'cs-shop-gear',
  templateUrl: './shop-gear.component.html',
  styleUrls: ['./shop-gear.component.css']
})
export class ShopGearComponent implements OnInit {
  equipmentList: Gear[];
  title: string;
  updated: string;

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Shop - Gear',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Gear custom made by Cybersmily.'
    );
    this.getEquipment();
  }
  private getEquipment(): void {
    this.dataService
      .GetJson('/json/shop/shopgear.json')
      .subscribe(
        resultObj => {
          this.title = resultObj.title;
          this.updated = resultObj.updated;
          this.equipmentList = resultObj.items;
        },
        error => console.log( 'Error :: ' + error)
      );
  }
}
