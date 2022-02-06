import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020StatBlock } from '../../cp2020-stats/models/cp2020-stat-block';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-save-wounds',
  templateUrl: './cp2020-save-wounds.component.html',
  styleUrls: ['./cp2020-save-wounds.component.css']
})
export class Cp2020SaveWoundsComponent implements OnInit {

  faDice = faDice;
  modalRef: BsModalRef;
  stunSaveRoll = 0;
  stunSaveMod = 0;
  stunMessage = '';
  deathSaveRoll = 0;
  deathSaveMod = 0;
  deathMessage = '';

  @Input()
  stats: Cp2020StatBlock;

  @Output()
  changeStats: EventEmitter<Cp2020StatBlock> = new EventEmitter<Cp2020StatBlock>();

  get save():number {
    return this.stats ? this.stats.Save : 0;
  }

  get deathsave():number {
    return this.stats ? this.stats.DeathSave : 0;
  }

  get wounds(): number {
    return this.stats ? this.stats.Damage : 0;
  }

  get btm(): number {
    return this.stats ? this.stats.BTM : 0;
  }

  get dmgMod(): number {
    return this.stats?.BodyDmgMod ?? 0;
  }


  get isLightWound(): boolean {
    return (this.stats?.Damage > 4) ?? false;
  }

  get isMortalWound(): boolean {
    return (this.stats?.Damage > 12) ?? false;
  }

  get isStunned(): boolean {
    return this.stats?.isStunned ?? false;
  }
  set isStunned(value:boolean) {
    if (this.stats) {
      this.stats.isStunned = value;
    }
  }

  get ignoreWounds(): boolean {
    return this.stats?.ignoreWounds ?? false;
  }

  set ignoreWounds(value: boolean) {
    this.stats.ignoreWounds = value;
  }

  get ignoreSaves(): boolean {
    return this.stats?.ignoreSaves ?? false;
  }

  set ignoreSaves(value: boolean) {
    this.stats.ignoreSaves = value;
  }

  get isDying(): boolean {
    return (this.stats?.deathState > 0) ?? false;
  }
  get isDead(): boolean {
    return (this.stats?.deathState > 9) ?? false;
  }

  get deathState(): number {
    return this.stats ? this.stats.deathState : 0;
  }
  set deathState(value: number) {
    this.stats.deathState = value;
    this.update();
  }

  getDamage(value: number): number {
    return this.stats ? this.stats.Damage - value : 0;
  }

  update() {
    this.changeStats.emit(this.stats);
  }

  constructor(private modalService: BsModalService, private dice: DiceService) { }

  ngOnInit() {}

  onChangeDamage(event: number) {
    if(this.stats) {
      this.stats.Damage = event;
      this.update();
    }
  }

  updateIgnoreWounds() {
    this.stats.Damage = this.stats.Damage;
    this.update();
  }

  openSave(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
  }

  rollStunSave() {
    if (this.stats) {
    this.stunSaveRoll = this.dice.generateNumber(1, 10);
    this.stunMessage = '';
    if (this.stunSaveRoll > (this.stats.Save + this.stunSaveMod)) {
      this.stunMessage = 'Stunned! Try again next turn';
      this.stats.isStunned = true;
    } else {
      this.stunMessage = 'Saved! You\'re still awake.';
      this.stats.isStunned = false;
    }
    this.update();
  }
  }

  rollDeathSave() {
    if (this.stats) {
    this.deathSaveRoll = this.dice.generateNumber(1, 10);
    this.deathMessage = '';

    if (this.deathSaveRoll > (this.stats.DeathSave + this.deathSaveMod)) {
      this.deathMessage = 'You died! Death State is 1. See page 116 Cyberpunk 2020 book for details.';
      this.stats.deathState = 1;
    } else {
      this.deathMessage = 'You\'re still breathing and in the fight!';
      this.stats.deathState = 0;
    }
    this.update();
  }
  }
}
