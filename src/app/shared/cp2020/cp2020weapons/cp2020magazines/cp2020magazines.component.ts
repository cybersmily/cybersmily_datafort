import { CpPlayerWeapon } from './../models/cp-player-weapon';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cp2020WeaponMagazine } from '../models/cp-2020-weapon-magazine';

@Component({
  selector: 'cs-cp2020magazines',
  templateUrl: './cp2020magazines.component.html',
  styleUrls: ['./cp2020magazines.component.css']
})
export class Cp2020magazinesComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Output()
  updateMagazines: EventEmitter<Array<Cp2020WeaponMagazine>> = new EventEmitter<Array<Cp2020WeaponMagazine>>();

  newMagMultiplier = 1;
  newMagType = 5;
  newMagSubtype = '';
  newMagCapacity = 0;

  get newMagCost(): number {
    return this.weapon.shots * this.newMagMultiplier * this.magType;
  }

  get magType(): number {
    if (this.weapon.cased ) {
      return 1;
    } else if(this.weapon.type.toLowerCase() === 'hvy') {
      return 3;
    }
    return 0.5;
  }

  constructor() { }

  ngOnInit(): void {
    this.newMagCapacity = this.weapon.shots;
  }

  changeMultiply(): void {
    this.newMagCapacity = this.weapon.shots * this.newMagMultiplier;
  }

  changeCapacity(): void {
    this.newMagMultiplier = Math.ceil(this.newMagCapacity/this.weapon.shots);
  }

  addMagazine() {
    const mag = {
      ammo: this.weapon.ammo,
      used: 0,
      capacity: this.newMagCapacity,
      cost: this.newMagCost,
      multiplier: this.newMagMultiplier,
      subtype: (this.newMagSubtype != '') ? this.newMagSubtype : undefined
    };
    this.weapon.magazines.push(mag);
    this.updateMagazines.emit(new Array(...this.weapon.magazines));
  }

  delteMagazine(index: number) {
    this.weapon.magazines.splice(index, 1);
    this.updateMagazines.emit(new Array(...this.weapon.magazines));
  }

}
