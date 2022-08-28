import { ACPAEnclosure } from './../../enums/acpa-enclossure';
import { Cp2020ACPAWeapon } from '../../models/cp2020-acpa-weapon';
import { Cp2020ACPAComponent } from '../../models/cp2020-acpa-component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-acpa-select-equipment',
  templateUrl: './cp2020-acpa-select-equipment.component.html',
  styleUrls: ['./cp2020-acpa-select-equipment.component.css'],
})
export class Cp2020AcpaSelectEquipmentComponent implements OnInit {
  weaponCategories = new Array<string>();
  componentCategories = new Array<string>();
  selectedOption = { type: '', category: '' };
  filterLocation = '';

  @Input()
  location = '';

  @Input()
  enclosureType: ACPAEnclosure = ACPAEnclosure.internal;

  @Input()
  componentList = new Array<Cp2020ACPAComponent>();

  @Input()
  weaponList = new Array<Cp2020ACPAWeapon>();

  @Output()
  chooseEquipment = new EventEmitter<Cp2020ACPAWeapon | Cp2020ACPAComponent>();

  constructor() {}

  ngOnInit(): void {
    this.filterLocation = this.location.replace('r ', '').replace('l ', '');
    this.weaponCategories = this.currWeaponList
      .map((wpn) => wpn.category)
      .filter((value, index, self) => self.indexOf(value) === index);
    this.componentCategories = this.currComponentList
      .map((comp) => comp.category)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  get currComponentList(): Array<Cp2020ACPAComponent> {
    let list = this.componentList;
    switch (this.enclosureType) {
      case ACPAEnclosure.internal:
        return list.filter(
          (item) =>
            item?.internal?.includes(this.filterLocation) ||
            item?.internal?.includes('any')
        );
      case ACPAEnclosure.external:
        return list.filter(
          (item) =>
            item?.external?.includes(this.filterLocation) ||
            item?.external?.includes('any')
        );
      default:
        return list.filter((item) => item.spaces === 0);
    }
  }

  get currWeaponList(): Array<Cp2020ACPAWeapon> {
    let list = this.weaponList;
    switch (this.enclosureType) {
      case ACPAEnclosure.internal:
        return list.filter(
          (item) =>
            item?.internal?.includes(this.filterLocation) ||
            item?.internal?.includes('any')
        );
      case ACPAEnclosure.external:
        return list.filter(
          (item) =>
            item?.external?.includes(this.filterLocation) ||
            item?.external?.includes('any')
        );
      case ACPAEnclosure.carried:
        return list.filter(
          (item) =>
            item?.external?.includes('handed') ||
            item?.external?.includes('any') ||
            item.spaces === 0
        );
      default:
        return new Array<Cp2020ACPAWeapon>();
    }
  }

  selectEquipment(equip: Cp2020ACPAComponent | Cp2020ACPAWeapon) {
    this.chooseEquipment.emit(equip);
  }
}
