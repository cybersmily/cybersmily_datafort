import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020StatBlock } from './../../../models/cp2020character/cp2020-stat-block';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
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
  currStats: Cp2020StatBlock = new Cp2020StatBlock();

  @Input()
  stats = new Cp2020StatBlock();

  @Output()
  changeStats: EventEmitter<Cp2020StatBlock> = new EventEmitter<Cp2020StatBlock>();

  constructor(private modalService: BsModalService, private dice: DiceService) { }

  ngOnInit() {
    this.currStats = this.stats;
  }

  onChangeDamage(event: number) {
    this.currStats.Damage = event;
    this.changeStats.emit(this.currStats);
  }

  openSave(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
  }

  rollStunSave() {
    this.stunSaveRoll = this.dice.generateNumber(1, 10);
    this.stunMessage = '';
    if (this.stunSaveRoll > (this.currStats.Save + this.stunSaveMod)) {
      this.stunMessage = 'Stunned! Try again next turn';
      this.currStats.isStunned = true;
    } else {
      this.stunMessage = 'Saved! You\'re still awake.';
      this.currStats.isStunned = false;
    }
    this.changeStats.emit(this.currStats);
  }

  rollDeathSave() {
    this.deathSaveRoll = this.dice.generateNumber(1, 10);
    this.deathMessage = '';

    if (this.deathSaveRoll > (this.currStats.DeathSave + this.deathSaveMod)) {
      this.deathMessage = 'You died! Death State is 1. See page 116 Cyberpunk 2020 book for details.';
      this.currStats.deathState = 1;
    } else {
      this.deathMessage = 'You\'re still breathing and in the fight!';
      this.currStats.deathState = 0;
    }
    this.changeStats.emit(this.currStats);
  }
}
