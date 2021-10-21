import { Cp2020PlayerAmmo } from './../models/cp-2020-player-ammo';
import { JsonDataFiles } from './../../../services/file-services/json-data-files';
import { DataService } from './../../../services/file-services/data.service';
import { faPlus, faTrash, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Cp2020Ammo, Cp2020AmmoTypes } from '../models';
@Component({
  selector: 'cs-cp2020ammo',
  templateUrl: './cp2020ammo.component.html',
  styleUrls: ['./cp2020ammo.component.css']
})
export class Cp2020ammoComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  @Input()
  ammoList: Array<Cp2020PlayerAmmo> = new Array<Cp2020PlayerAmmo>();

  @Output()
  updateAmmo: EventEmitter<Array<Cp2020PlayerAmmo>> = new EventEmitter<Array<Cp2020PlayerAmmo>>();

  ammoDataList: Array<Cp2020Ammo> = new Array<Cp2020Ammo>();
  ammoTypeList: Array<Cp2020AmmoTypes> = new Array<Cp2020AmmoTypes>();
  isCollapsed: boolean = false;
  get collapseChevron(): any {
    return (this.isCollapsed) ? faChevronRight : this.faChevronDown;
  }

  selectedAmmoIndex: number = -1;
  selectedAmmoSubtypeIndex: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.GetJson(JsonDataFiles.CP2020_WEAPON_AMMO_LIST_JSON)
    .subscribe( data => {
      this.ammoDataList = new Array<Cp2020Ammo>(...data.ammo);
      this.ammoTypeList = new Array<Cp2020AmmoTypes>(...data.types);
    });
  }

  get selectedCost(): number {
    if (this.selectedAmmoIndex < 0) {
      return 0;
    }
    const ammo = this.ammoDataList[this.selectedAmmoIndex];
    let cost = ammo.cost;
    if( ammo.hasTypes && this.selectedAmmoSubtypeIndex > -1) {
      cost = cost * this.ammoTypeList[this.selectedAmmoSubtypeIndex].costMultiplier;
    }
    return Math.ceil( cost);
  }

  get columnOne(): Array<Cp2020PlayerAmmo> {
    const arr = this.ammoList.slice(0, Math.ceil(this.ammoList.length/2));
    return arr;
  }

  get columnTwo(): Array<Cp2020PlayerAmmo> {
    return this.ammoList.slice(Math.ceil(this.ammoList.length/2));
  }

  get roundsPerBox(): number {
    if (this.selectedAmmoIndex < 0) {
      return 0;
    }
    return this.ammoDataList[this.selectedAmmoIndex].perBox;
  }

  hasSubtype(index: number): boolean {
    return (index > -1) ?this.ammoDataList[index].hasTypes : false;
  }

  add() {
    if (this.selectedAmmoIndex > - 1){
      const newAmmo = new Cp2020PlayerAmmo();
      const ammo = this.ammoDataList[this.selectedAmmoIndex];
      newAmmo.name = ammo.type;
      newAmmo.subtype = (ammo.subtype ? ` ${ammo.subtype}`: '');
      newAmmo.notes = ammo.notes;
      if(ammo.hasTypes && this.selectedAmmoSubtypeIndex > -1) {
        newAmmo.subtype = this.ammoTypeList[this.selectedAmmoSubtypeIndex].type;
        newAmmo.notes += ` ${this.ammoTypeList[this.selectedAmmoSubtypeIndex].notes}`;
      }
      newAmmo.cost = this.selectedCost;
      newAmmo.rounds = ammo.perBox;
      newAmmo.perBox = ammo.perBox;

      const found = this.ammoList.findIndex( a => a.name === newAmmo.name && a.subtype === newAmmo.subtype);
      if (found > -1) {
        this.ammoList[found].rounds += newAmmo.rounds;
      } else {
        this.ammoList.push(newAmmo);
      }
    }

    this.updateAmmo.emit(this.ammoList);
  }

  delete(index: number, column: number) {
    this.ammoList.splice(index, 1);
    this.updateAmmo.emit(this.ammoList);
  }

}
