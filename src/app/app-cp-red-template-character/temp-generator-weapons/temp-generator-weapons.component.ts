import { BaseWeapon } from '../../shared/cp2020/cp2020weapons/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cs-temp-generator-weapons',
  templateUrl: './temp-generator-weapons.component.html',
  styleUrls: ['./temp-generator-weapons.component.css']
})
export class TempGeneratorWeaponsComponent implements OnInit {

  @Input()
  weapons: BaseWeapon[];

  constructor() { }

  ngOnInit() {
    this.weapons = new Array<BaseWeapon>();
  }

  getY(index: number): number {
    let y = 0;
    y = (index * 30) + 20;
    return y;
  }

}
