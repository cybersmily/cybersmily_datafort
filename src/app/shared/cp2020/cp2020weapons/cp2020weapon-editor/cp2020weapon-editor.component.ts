import { faSave } from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeapon, WeaponProperties } from './../../../models/weapon';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapon-editor',
  templateUrl: './cp2020weapon-editor.component.html',
  styleUrls: ['./cp2020weapon-editor.component.css'],
})
export class Cp2020weaponEditorComponent implements OnInit {
  faSave = faSave;
  weaponTypes = WeaponProperties.types;
  availabilities = WeaponProperties.availabilities;
  concealments = WeaponProperties.concealments;
  reliabilites = WeaponProperties.reliabilites;
  newWeapon: CpPlayerWeapon;

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Output()
  updateWeapon: EventEmitter<CpPlayerWeapon> = new EventEmitter<
    CpPlayerWeapon
  >();

  constructor() {}

  ngOnInit(): void {
    this.newWeapon = new CpPlayerWeapon(this.weapon);
  }

  update() {
    if (this.newWeapon.name && this.newWeapon.name !== '') {
      this.updateWeapon.emit(this.newWeapon);
      this.newWeapon = new CpPlayerWeapon();
    }
  }

}
