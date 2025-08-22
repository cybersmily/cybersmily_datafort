import { DiceRolls } from './../../../models/dice-rolls';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../../services/dice/dice.service';
import { Component, OnInit, Input, Output, TemplateRef, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-cp2020-rep-section',
    templateUrl: './cp2020-rep-section.component.html',
    styleUrls: ['./cp2020-rep-section.component.css'],
    standalone: false
})
export class Cp2020RepSectionComponent implements OnInit {
  faDice = faDice;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };

  repRoll: DiceRolls = new DiceRolls();


  @Input()
  rep: number = 0;

  @Output()
  changeRep = new EventEmitter<number>();


  constructor(private diceService: DiceService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }


  updateRep() {
    this.changeRep.emit(this.rep);
  }

  rollRep() {
    this.repRoll = this.diceService.rollCP2020D10();
  }

  openModal(template: TemplateRef<any>) {
    this.rollRep();
    this.modalRef = this.modalService.show(template, this.config);
  }

}
