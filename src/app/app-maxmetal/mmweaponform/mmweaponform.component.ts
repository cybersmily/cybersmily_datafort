import { MaxMetalWeaponCategory, MaxMetalWeaponMount, VehicleWeapon, MaxMetalWeapon } from './../../shared/cp2020/cp2020weapons/models';
import { MaxMetalDataService, MaxmetalService } from '../../shared/cp2020/cp2020-vehicles/services';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-mmweaponform',
    templateUrl: './mmweaponform.component.html',
    styleUrls: ['./mmweaponform.component.css'],
    standalone: false
})
export class MmweaponformComponent implements OnInit {

  @Output()
  addVehicleWeapon = new EventEmitter();

  weapons: MaxMetalWeaponCategory[] = new Array<MaxMetalWeaponCategory>();
  mounts: MaxMetalWeaponMount[] = new Array<MaxMetalWeaponMount>();
  currWeapon: MaxMetalWeapon = new MaxMetalWeapon();
  selectedCategory: MaxMetalWeaponCategory = null;
  selectedWeapon: MaxMetalWeapon = null;
  addDisabled: boolean;

  constructor(private mmDataService: MaxMetalDataService, private mmGenService: MaxmetalService) { }

  ngOnInit() {
    this.addDisabled = true;
    this.currWeapon = new MaxMetalWeapon();
    this.currWeapon.mounting = null;
    this.mmDataService.loadWeapons().subscribe( data => {
      this.weapons = data;
      this.weapons.forEach(cat => {
        cat.value.items.sort( (a, b) => (a.name > b.name) ? 1 : -1);
      });
    });
  }

  get Weapons(): Array<MaxMetalWeapon> {
    if (this.selectedCategory) {
      return this.selectedCategory.value.items;
    }
    return new Array<MaxMetalWeapon>();
  }

  changeCategory() {}

  changeWeapon() {
    this.currWeapon.copy(this.selectedWeapon);
    this.mmDataService.loadWeaponMounts().subscribe( data => {
        this.mounts = data;
        // check to see if the mount is available for the weapon.
        this.mounts = this.mounts.filter( (mount, ind, array) => {
          let result = false;
          const spcLmt = Number(mount.spacelimit);
          if (!isNaN(spcLmt) && spcLmt > 0) {
            result = ( this.selectedWeapon.spaces <= spcLmt);
          } else {
            result = true;
          }
          if ( mount.typelimit) {
            result = (result && mount.typelimit === this.selectedWeapon.type);
          }
          return result;
        });
      });
  }

  changeMount() {
    if (this.currWeapon.mounting.name !== '') {
      this.addDisabled = false;
    } else {
      this.addDisabled = true;
    }
  }

  addWeapon() {
    this.addVehicleWeapon.emit(this.currWeapon);
  }

}
