import { MaxMetalWeapon, MaxMetalWeaponList } from '../../shared/cp2020/cp2020weapons/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-mmweaponlist',
    templateUrl: './mmweaponlist.component.html',
    styleUrls: ['./mmweaponlist.component.css'],
    standalone: false
})
export class MmweaponlistComponent implements OnInit {

  @Input()
  weaponList = new MaxMetalWeaponList();

  @Output()
  removeWeapon = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  spaces() {
    return (this.weaponList) ? this.weaponList.calculateSpace() : 0;
  }

  cost() {
    return (this.weaponList) ? this.weaponList.calculateCost() : 0;
  }

  removeWpn(weapon: MaxMetalWeapon) {
    this.removeWeapon.emit(weapon);
  }

}
