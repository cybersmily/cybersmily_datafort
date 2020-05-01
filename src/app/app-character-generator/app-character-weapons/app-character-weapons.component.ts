import { CpPlayerWeaponList } from '../../shared/models/weapon';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-app-character-weapons',
  templateUrl: './app-character-weapons.component.html',
  styleUrls: ['./app-character-weapons.component.css']
})
export class AppCharacterWeaponsComponent implements OnInit {

  @Input()
  weapons = new CpPlayerWeaponList(10);

  @Output()
  changeWeapon = new EventEmitter<CpPlayerWeaponList>();

  constructor() { }

  ngOnInit() {
  }

  onWeaponChange() {
    this.changeWeapon.emit(this.weapons);
  }

}
