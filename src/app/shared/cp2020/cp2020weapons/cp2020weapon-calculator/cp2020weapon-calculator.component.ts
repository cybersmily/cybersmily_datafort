import { CpPlayerWeaponList } from './../../../models/weapon';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapon-calculator',
  templateUrl: './cp2020weapon-calculator.component.html',
  styleUrls: ['./cp2020weapon-calculator.component.css']
})
export class Cp2020weaponCalculatorComponent implements OnInit {

  faDice = faDice;
  @Input()
  weaponList: CpPlayerWeaponList = new CpPlayerWeaponList();

  constructor() { }

  ngOnInit(): void {
  }

}
