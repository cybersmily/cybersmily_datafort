import { DataCyberware } from './../../shared/cp2020/cp2020-cyberware/models';
import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { DataService } from './../../shared/services/file-services/data.service';
import { Component, OnInit } from '@angular/core';

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
      .GetJson(JsonDataFiles.CP2020_SHOP_CYBERWARE_JSON)
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
