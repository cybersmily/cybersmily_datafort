import { faSave } from '@fortawesome/free-solid-svg-icons';
import { ACPAEnclosure } from './../../enums/acpa-enclossure';
import { Cp2020ACPAWeapon } from './../../models/cp2020-acpa-weapon';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-acpa-weapon-editor',
  templateUrl: './cp2020-acpa-weapon-editor.component.html',
  styleUrls: ['./cp2020-acpa-weapon-editor.component.css'],
})
export class Cp2020AcpaWeaponEditorComponent implements OnInit {
  faSave = faSave;

  @Input()
  acpaWeapon: Cp2020ACPAWeapon;

  @Input()
  enclosureType: ACPAEnclosure = ACPAEnclosure.internal;

  @Output()
  updateWeapon: EventEmitter<Cp2020ACPAWeapon> = new EventEmitter<Cp2020ACPAWeapon>();

  currWeapon: Cp2020ACPAWeapon = new Cp2020ACPAWeapon();

  constructor() {}

  ngOnInit(): void {
    if (this.acpaWeapon) {
      this.currWeapon = new Cp2020ACPAWeapon(this.acpaWeapon);
    }
    this.currWeapon.spaces = 1;
  }

  save(): void {
    this.currWeapon.enclosed = this.enclosureType;
    this.currWeapon.category = 'customWeapon';
    this.currWeapon.spaces =
      this.currWeapon.spaces < 1 ? 1 : this.currWeapon.spaces;
    this.updateWeapon.emit(this.currWeapon);
    this.currWeapon = new Cp2020ACPAWeapon();
  }
}
