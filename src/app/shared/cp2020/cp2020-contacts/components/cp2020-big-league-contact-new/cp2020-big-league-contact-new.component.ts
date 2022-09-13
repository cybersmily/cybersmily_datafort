import { BigLeagueCategories, BigLeagueContact } from './../../models';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cs-cp2020-big-league-contact-new',
  templateUrl: './cp2020-big-league-contact-new.component.html',
  styleUrls: ['./cp2020-big-league-contact-new.component.css'],
})
export class Cp2020BigLeagueContactNewComponent implements OnInit {
  faPlus = faPlus;

  catagories = new BigLeagueCategories();

  contact: BigLeagueContact = new BigLeagueContact();

  @Input()
  maxPoints: number;

  @Output()
  save = new EventEmitter<BigLeagueContact>();

  get isDisabled(): boolean {
    return (
      !this.contact.name ||
      !this.reliability ||
      !this.capability ||
      !this.availability ||
      !this.reputation ||
      this.contact.cost > this.maxPoints
    );
  }
  constructor() {}

  ngOnInit(): void {
    console.log(this.contact);
  }

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

  addContact() {
    this.save.emit(this.contact);
  }
}
