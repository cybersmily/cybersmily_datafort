import { Cp2020PlayerSkill } from './../../shared/models/cp2020character';
import { CpPlayerWeapon } from './../../shared/models/weapon';
import { DiceService } from './../../shared/services/dice/dice.service';
import { faDice, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trk-wpn',
  templateUrl: './cmbt-trk-wpn.component.html',
  styleUrls: ['./cmbt-trk-wpn.component.css']
})
export class CmbtTrkWpnComponent implements OnInit {
  dice = faDice;
  faTrash = faTrash;

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Input()
  index:  number;

  @Input()
  skill: Cp2020PlayerSkill = null;

  @Output()
  delete = new EventEmitter<number>();

  damageResults = '';
  relResults = '';

  constructor(private roll: DiceService) { }

  ngOnInit() {
  }

  get damageArray(): Array<string> {
    return (this.weapon) ? this.weapon.damage.split('/') : new Array<string>();
  }


  rollDamage(dmg: string) {
    this.damageResults = this.roll.rollMoreDice(dmg).show();
  }

  isDice(dmg: string): boolean {
    const reg = /\d+[dD]\d+/g;
    return RegExp(reg).test(dmg);
  }

  rollToHit() {}

  reload() {
    this.weapon.shotsUsed = isNaN(Number(this.weapon.shots)) ? 0 : Number(this.weapon.shots);
  }

  unjam() {
    this.weapon.jammed = false;
  }

  fire() {
    this.weapon.shotsUsed--;
  }

  rollReliability() {
    let roll = this.roll.generateNumber(1, 10);
    this.weapon.checkReliability(roll);
    roll = this.roll.generateNumber(1, 6);
    this.relResults = (this.weapon.jammed) ? 'Weapon jammed for ' + roll + 'turns.' : 'No Jam';
  }

  deleteWpn() {
    this.delete.emit(this.index);
  }
}

