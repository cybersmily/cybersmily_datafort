import { BehaviorSubject } from 'rxjs';
import { Cp2020ArmorPiece } from './../../models/cp2020-armor-piece';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArmorListService {
  private _currArmorList = new Array<Cp2020ArmorPiece>();
  private _armorList = new BehaviorSubject<Array<Cp2020ArmorPiece>>(new Array<Cp2020ArmorPiece>());
  armorList = this._armorList.asObservable();


  constructor() { }

  add(armor: Cp2020ArmorPiece) {
    this._currArmorList.push(armor);
    this._armorList.next(this._currArmorList.sort((a,b) => a.name.localeCompare(b.name)));
  }

  update(index: number, armor: Cp2020ArmorPiece) {
    this._currArmorList[index] = new Cp2020ArmorPiece(armor);
    this._armorList.next(this._currArmorList.sort((a,b) => a.name.localeCompare(b.name)));
  }

  remove(index: number) {
    this._currArmorList.splice(index, 1);
    this._armorList.next(this._currArmorList);
  }

  append(armorArray: Array<Cp2020ArmorPiece>) {
    this._currArmorList.push(...armorArray);
    this._armorList.next(this._currArmorList.sort((a,b) => a.name.localeCompare(b.name)));
  }

  refresh() {
    this._armorList.next(new Array<Cp2020ArmorPiece>());
  }
}
