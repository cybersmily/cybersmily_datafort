import { SeoService } from './../../shared/services/seo/seo.service';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { DataCyberware } from '../../shared/models/cyberware';


@Component({
  selector: 'cs-shop-cyberware',
  templateUrl: './shop-cyberware.component.html',
  styleUrls: ['./shop-cyberware.component.css']
})
export class ShopCyberwareComponent implements OnInit {
  cyberwareList: DataCyberware[];
  title: string;
  updated: string;

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Shop - Cyberware',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Cyberware custom made by Cybersmily.'
    );
    this.getCyberware();
  }
  private getCyberware(): void {
    this.dataService
      .GetJson('/json/shop/shopcyber.json')
      .subscribe(
        resultObj => {
          this.cyberwareList = resultObj.items;
          this.title = resultObj.title;
          this.updated = resultObj.updated;
        },
        error => console.log( 'Error :: ' + error)
      );
  }
}
