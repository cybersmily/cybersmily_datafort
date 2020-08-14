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

  @Input()
  BodDmgMod = 0;

  @Output()
  delete = new EventEmitter<number>();

  damageResults = '';
  relResults = '';

  constructor(private diceService: DiceService) { }

  ngOnInit() {
  }

  get damageArray(): Array<string> {
    return (this.weapon) ? this.weapon.damage.split('/') : new Array<string>();
  }


  rollDamage(dmg: string) {
    this.damageResults = this.weapon.rollDamage(this.diceService, 1, this.BodDmgMod)[0];
  }

  isDice(dmg: string): boolean {
    const reg = /\d+[dD]\d+/g;
    return RegExp(reg).test(dmg);
  }

  rollToHit() {}

  reload() {
    this.weapon.reload();
  }

  unjam() {
    this.weapon.jammed = false;
  }

  fire() {
    this.weapon.fire(this.diceService, 0, this.skill.value);
  }

  rollReliability() {
    this.relResults = this.weapon.checkReliability(this.diceService);
  }

  deleteWpn() {
    this.delete.emit(this.index);
  }
}
