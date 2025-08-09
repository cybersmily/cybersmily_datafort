import { BigLeagueCategories, BigLeagueContact } from './../../models';
import { faPen, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-fixer-calc-big-league-contact',
    templateUrl: './fixer-calc-big-league-contact.component.html',
    styleUrls: ['./fixer-calc-big-league-contact.component.css'],
    standalone: false
})
export class FixerCalcBigLeagueContactComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faSave = faSave;
  editMode = false;
  catagories = new BigLeagueCategories();

  @Input()
  contact: BigLeagueContact = new BigLeagueContact();

  @Input()
  index = -1;

  @Output()
  delete = new EventEmitter<number>();

  @Output()
  edit = new EventEmitter<BigLeagueContact>();

  constructor() {}

  ngOnInit() {}

  get capability(): string {
    return this.contact && this.contact.capability
      ? this.contact.capability.name
      : '';
  }

  set capability(value: string) {
    if (value !== '') {
      this.contact.capability = this.catagories.capabilities.find(
        (c) => c.name === value
      );
    }
  }

  get reputation(): string {
    return this.contact && this.contact.reputation
      ? this.contact.reputation.name
      : '';
  }

  set reputation(value: string) {
    if (value !== '') {
      this.contact.reputation = this.catagories.reputations.find(
        (c) => c.name === value
      );
    }
  }

  get availability(): string {
    return this.contact && this.contact.availability
      ? this.contact.availability.name
      : '';
  }

  set availability(value: string) {
    if (value !== '') {
      this.contact.availability = this.catagories.availabilities.find(
        (c) => c.name === value
      );
    }
  }

  get reliability(): string {
    return this.contact && this.contact.reliability
      ? this.contact.reliability.name
      : '';
  }

  set reliability(value: string) {
    if (value !== '') {
      this.contact.reliability = this.catagories.reliabilities.find(
        (c) => c.name === value
      );
    }
  }

  deleteContact() {
    this.delete.emit(this.index);
  }

  editContact() {
    this.editMode = true;
  }

  saveContact() {
    this.editMode = false;
    this.edit.emit(this.contact);
  }
}
