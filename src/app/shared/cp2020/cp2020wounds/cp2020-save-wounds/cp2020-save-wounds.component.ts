import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020StatBlock } from './../../../models/cp2020character/cp2020-stat-block';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'cs-cp2020-save-wounds',
  templateUrl: './cp2020-save-wounds.component.html',
  styleUrls: ['./cp2020-save-wounds.component.css']
})
export class Cp2020SaveWoundsComponent implements OnInit {

  faDice = faDice;
  modalRef: BsModalRef;
  stunSaveRoll = 0;
  stunMessage = '';
  deathSaveRoll = 0;
  deathMessage = '';

  @Input()
  stats = new Cp2020StatBlock();

  constructor(private modalService: BsModalService, private dice: DiceService) { }

  ngOnInit() {
  }

  onChangeDamage(event: number) {
    this.stats.Damage = event;
  }

  onClick(template: TemplateRef<any>) {
    this.stunSaveRoll = this.dice.generateNumber(1, 10);
    this.deathSaveRoll = this.dice.generateNumber(1, 10);
    this.stunMessage = '';
    this.deathMessage = '';

    if (this.stunSaveRoll <= this.stats.Save) {
      this.stunMessage = 'Saved! You\'re still awake.';
    } else {
      this.stunMessage = 'Stunned! Try again next turn';
    }
    if (this.deathSaveRoll <= this.stats.DeathSave) {
      this.deathMessage = 'You\'re still breathing and in the fight!';
    } else {
      this.deathMessage = 'You died! Death State is 1. See page 116 Cyberpunk 2020 book for details.';
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
  }
}
