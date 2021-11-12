import { Cp2020ACPAWeapon } from './../models/cp2020-acpa-weapon';
import { Cp2020ACPAComponent } from './../models/cp2020-acpa-component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-acpa-select-equipement',
  templateUrl: './cp2020-acpa-select-equipement.component.html',
  styleUrls: ['./cp2020-acpa-select-equipement.component.css']
})
export class Cp2020AcpaSelectEquipementComponent implements OnInit {

  weaponCategories = new Array<string>();
  componentCategories = new Array<string>();
  selectedOption = {type: '', category: ''};

  @Input()
  location = '';

  @Input()
  internal = true;

  @Input()
  external = false;

  @Input()
  carried = false;

  @Input()
  componentList = new Array<Cp2020ACPAComponent>();

  @Input()
  weaponList = new Array<Cp2020ACPAWeapon>();

  @Output()
  chooseEquipment = new EventEmitter<Cp2020ACPAWeapon|Cp2020ACPAComponent>();

  constructor() { }

  ngOnInit(): void {
    this.location = this.location.replace('r ', '').replace('l ', '');
    console.log('onInit', this.currComponentList);
    this.weaponCategories = this.currWeaponList.map(wpn => wpn.category).filter((value, index, self) => self.indexOf(value) === index);
    this.componentCategories = this.currComponentList.map(comp => comp.category).filter((value, index, self) => self.indexOf(value) === index);
  }

  get currComponentList(): Array<Cp2020ACPAComponent>{
    let list = this.componentList;
    if (this.internal) {
      return list.filter(item => item?.internal?.includes(this.location) || item?.external?.includes('any'));
    }
    if (this.external) {
      return list.filter(item => item?.external?.includes(this.location) || item?.external?.includes('any'));
    }
    return list.filter(item => item.spaces === 0);
  }

  get currWeaponList(): Array<Cp2020ACPAWeapon>{
    let list = this.weaponList;
    if (this.internal) {
      return list.filter(item => item?.internal?.includes(this.location) || item?.internal?.includes('any'));
    }
    if (this.external) {
      return list.filter(item => item?.external?.includes(this.location) || item?.external?.includes('any'));
    }
    if (this.carried ) {
      return list.filter(item =>  item?.external?.includes('handed') || item?.external?.includes('any'));
    }
    return new Array<Cp2020ACPAWeapon>();
  }

  selectEquipment(equip: Cp2020ACPAComponent | Cp2020ACPAWeapon) {
    console.log('emit', equip);
    this.chooseEquipment.emit(equip);
  }

}
