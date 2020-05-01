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
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getWeapons();
  }

  private getWeapons() {
    this.dataService
      .GetJson('/json/data/moreguns.json')
      .subscribe(
        resultObj => {
          this.weaponList = resultObj.weapons;
        },
        error => console.log( 'Error :: ' + error)
      );
  }

}
