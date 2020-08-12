import { Cp2020StatBlock, Cp2020PlayerSkill } from './../../../models/cp2020character';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CpPlayerWeapon } from './../../../models/weapon';

@Component({
  selector: 'cs-cp2020weapontable',
  templateUrl: './cp2020weapontable.component.html',
  styleUrls: ['./cp2020weapontable.component.css']
})
export class Cp2020weapontableComponent implements OnInit {

  @Input()
  weapons: Array<CpPlayerWeapon> = new Array<CpPlayerWeapon>();

  @Input()
  stats: Cp2020StatBlock = new Cp2020StatBlock();

  @Input()
  skills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  @Output()
  changeWeapons: EventEmitter<Array<CpPlayerWeapon>> = new EventEmitter<Array<CpPlayerWeapon>>();

  constructor() { }

  ngOnInit(): void {
  }

  updateWeapon(data: {index: number, wpn: CpPlayerWeapon}) {
    this.weapons[data.index] = data.wpn;
    this.weapons.sort( (a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1);
    this.changeWeapons.emit(this.weapons);
  }

  deleteWeapon(index: number) {
    this.weapons.splice(index, 1);
    this.changeWeapons.emit(this.weapons);
  }

  addWeapon(wpn: CpPlayerWeapon) {
    this.weapons.push(wpn);
    this.weapons.sort( (a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1);
    this.changeWeapons.emit(this.weapons);
  }

}
