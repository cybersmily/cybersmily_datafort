import { LocalStorageManagerService } from './../../shared/services/local-storage-manager/local-storage-manager.service';
import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { FixerCharts, HotStuffArea } from '../../shared/cp2020/cp2020-contacts/models';

@Component({
  selector: 'cs-fixer-calc-main',
  templateUrl: './fixer-calc-main.component.html',
  styleUrls: ['./fixer-calc-main.component.css'],
  standalone: false,
})
export class FixerCalcMainComponent implements OnInit {
  private _streetdealKey: string = 'csd_fixer_streetdeal_key';

  areaList: Array<HotStuffArea> = new Array<HotStuffArea>();
  streetdeal: number = 0;

  constructor(
    private seo: SeoService,
    private localStorageService: LocalStorageManagerService
  ) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Fixer Calculator',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 Fixer Calculator is an application to generate a Fixer character contacts using the Wildside supplement."
    );
    this.streetdeal =
      this.localStorageService.retrive<number>(this._streetdealKey) ?? 0;
  }

  changeStreetdeal() {
    // make sure streetdeal falls within acceptable values.
    this.streetdeal =
      this.streetdeal < 0 ? 0 : this.streetdeal > 10 ? 10 : this.streetdeal;
    this.localStorageService.store<number>(
      this._streetdealKey,
      this.streetdeal
    );
  }

  updateHotStuff(event: Array<HotStuffArea>): void {
    this.areaList = [...event];
  }

}
