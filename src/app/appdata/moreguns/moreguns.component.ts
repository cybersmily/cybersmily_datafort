import { JsonDataFiles } from './../../shared/json-data-files';
import { SeoService } from './../../shared/services/seo/seo.service';
import { CpWeapon, WeaponGroup } from '../../shared/models/weapon';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moreguns',
  templateUrl: './moreguns.component.html',
  styleUrls: ['./moreguns.component.css']
})
export class MoregunsComponent implements OnInit {
  weaponList: WeaponGroup[];
  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 More Guns',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 More Guns is a complied list of guns from The Edge of the Sword Vol 1 and Solo of Fortune.'
    );
    this.getWeapons();
  }

  private getWeapons() {
    this.dataService
      .GetJson(JsonDataFiles.CP2020_MORE_GUNS_JSON)
      .subscribe(
        resultObj => {
          this.weaponList = resultObj.weapons;
        },
        error => console.log( 'Error :: ' + error)
      );
  }

}
