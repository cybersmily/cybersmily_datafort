import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020PlayerSkill } from './../../../models/cp2020character';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';
import { CpPlayerWeapon } from './../../../models/weapon';

@Component({
  selector: 'cs-cp2020weapon-fire',
  templateUrl: './cp2020weapon-fire.component.html',
  styleUrls: ['./cp2020weapon-fire.component.css']
})
export class Cp2020weaponFireComponent implements OnInit {

  faDice = faDice;

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Input()
  ref = 0;

  @Input()
  bodyDamageMod = 0;

  @Input()
  body = 0;

  @Input()
  skills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  shots = 0;
  rangeToTarget = 1;
  fireMode = 2; // default to single shot
  shotsFired = 0;
  aimedTurns = 0;

  selectedSkill: Cp2020PlayerSkill = new Cp2020PlayerSkill();

  get totalDiff(): number {
    const wpnBracket = this.weapon.getRangeBracket(this.rangeToTarget);
    let total = 0;
    total = wpnBracket.diff;
    total -= this.aimedTurns;
    if (this.fireMode === 1 && wpnBracket.diff < 16) {
      total -= 3;
    }
    if (this.fireMode === 3) {
      total += (wpnBracket.diff < 11 ? 1 : -1 ) * Math.ceil(this.shotsFired / 10);
    }
    return total;
  }
  get fireShots(): number {
    if (this.fireMode === 2) {
      return (this.weapon.rof > 3) ? 2 : this.weapon.rof;
    } else {
      return this.weapon.rof;
    }
  }

  get weaponRange(): number {
    if (this.weapon.range && this.weapon.range > 0) {
      return this.weapon.range;
    }
    if (this.weapon.thrown) {
      return this.body * 10;
    }
    switch (this.weapon.type.toLowerCase()) {
      case 'p':
        return 50;
      case 'smg':
        return 150;
      case 'rif':
        return 400;
      case 'sht':
        return 50;
      default:
        return 1;
    }
  }

  constructor(private diceService: DiceService) { }

  ngOnInit(): void {
    this.selectedSkill = (this.skills.length === 1) ? this.selectedSkill = this.skills[0] : new Cp2020PlayerSkill();
  }

}
