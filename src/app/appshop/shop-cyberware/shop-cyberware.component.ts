import { Observable } from 'rxjs';
import { DataCyberware } from './../../shared/cp2020/cp2020-cyberware/models';
import { SeoService } from './../../shared/services/seo/seo.service';
import { DataService, JsonDataFiles } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-shop-cyberware',
    templateUrl: './shop-cyberware.component.html',
    styleUrls: ['./shop-cyberware.component.css'],
    standalone: false
})
export class ShopCyberwareComponent implements OnInit {
  cyberwareList$: Observable<{
    items: Array<DataCyberware>,
    title: string,
    updated: string
  }>;

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Shop - Cyberware',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Cyberware custom made by Cybersmily.'
    );
    this.getCyberware();
  }
  private getCyberware(): void {
    this.cyberwareList$ =  this.dataService
      .GetJson(JsonDataFiles.CP2020_SHOP_CYBERWARE_JSON);
  }
}
