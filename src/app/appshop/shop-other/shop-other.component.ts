import { JsonDataFiles } from './../../shared/json-data-files';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'cs-shop-other',
  templateUrl: './shop-other.component.html',
  styleUrls: ['./shop-other.component.css']
})
export class ShopOtherComponent implements OnInit {
  otherList: string[];
  title: string;
  updated: string;

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Shop - Other',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Services and other expenses custom made by Cybersmily.'
    );
    this.getOtherExpenses();
  }
  private getOtherExpenses(): void {
    this.dataService
      .GetJson(JsonDataFiles.CP2020_SHOP_OTHER_JSON)
      .subscribe(
        resultObj => {
          this.title = resultObj.title;
          this.updated = resultObj.updated;
          this.otherList = resultObj.items;
        },
        error => console.log( 'Error :: ' + error)
      );
  }
}
