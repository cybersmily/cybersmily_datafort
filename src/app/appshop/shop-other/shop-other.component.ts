import { Observable } from 'rxjs';
import { JsonDataFiles, DataService } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-shop-other',
    templateUrl: './shop-other.component.html',
    styleUrls: ['./shop-other.component.css'],
    standalone: false
})
export class ShopOtherComponent implements OnInit {
  otherList$: Observable<{
    items: Array<string>,
    title: string,
    updated: string
  }>

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Shop - Other',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Services and other expenses custom made by Cybersmily.'
    );
    this.getOtherExpenses();
  }
  private getOtherExpenses(): void {
    this.otherList$ = this.dataService
      .GetJson(JsonDataFiles.CP2020_SHOP_OTHER_JSON);
  }
}
