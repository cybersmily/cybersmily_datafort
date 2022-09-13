import { Cp2020PlayerContact } from './../../models/cp2020-player-contact';
import { faPlus, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-other-contact-new',
  templateUrl: './cp2020-other-contact-new.component.html',
  styleUrls: ['./cp2020-other-contact-new.component.css'],
})
export class Cp2020OtherContactNewComponent implements OnInit {
  faPlus = faPlus;
  faTimes = faTimes;
  faSave = faSave;

  currContact: Cp2020PlayerContact = new Cp2020PlayerContact();
  isEdit: boolean = false;

  @Output()
  add: EventEmitter<Cp2020PlayerContact> = new EventEmitter<Cp2020PlayerContact>();

  constructor() {}

  ngOnInit(): void {
    this.currContact = new Cp2020PlayerContact();
  }

  addContact(): void {
    this.add.emit(new Cp2020PlayerContact(this.currContact));
    this.currContact = new Cp2020PlayerContact();
  }
}
