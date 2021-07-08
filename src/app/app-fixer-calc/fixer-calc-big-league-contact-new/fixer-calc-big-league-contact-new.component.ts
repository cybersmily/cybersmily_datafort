import { DiceService } from './../../shared/services/dice/dice.service';
import { FixerBigLeagueService } from './../../shared/services/fixer/fixer-big-league.service';
import { faPlus, faDice } from '@fortawesome/free-solid-svg-icons';
import { BigLeagueCategory } from './../../shared/models/fixer/big-league-category';
import { BigLeagueContact } from './../../shared/models/fixer/big-league-contact';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { BigLeagueCategories } from './../../shared/models/fixer/big-league-categories';

@Component({
  selector: 'cs-fixer-calc-big-league-contact-new',
  templateUrl: './fixer-calc-big-league-contact-new.component.html',
  styleUrls: ['./fixer-calc-big-league-contact-new.component.css']
})
export class FixerCalcBigLeagueContactNewComponent implements OnInit{
  faPlus = faPlus;
  faDice = faDice;

  @Input()
  availablePoints = 0;

  @Input()
  contacts = new Array<BigLeagueContact>();

  @Input()
  contactTypes: Array<string> = new Array<string>();

  @Output()
  addContact = new EventEmitter<BigLeagueContact>();

  categories = new BigLeagueCategories();

  newContact: BigLeagueContact = new BigLeagueContact();
  capability = '';
  reputation = '';
  reliability = '';
  availability = '';

  constructor(private bigLeagueService: FixerBigLeagueService,
    private dice: DiceService) { }

  ngOnInit() {
  }

  createContact() {
    if (this.canAdd) {
      this.addContact.emit(this.newContact);
    }
  }

  get hasPoints(): boolean {
    return (this.availablePoints > 0.624);
  }

  get overPoints(): boolean {
    return (this.newContact.cost > this.availablePoints);
  }

  get capabilities(): Array<BigLeagueCategory> {
    return [...this.categories.capabilities];
  }

  get canAdd(): boolean {
    return (
      this.newContact.name !== ''
      && this.newContact.availability != null
      && this.newContact.capability != null
      && this.newContact.reliability != null
      && this.newContact.reputation != null
      && !this.exists
    );
  }

  get exists(): boolean {
    return this.contacts.some(c => c.name === this.newContact.name);
  }

  generateContact() {
    this.newContact = this.bigLeagueService.generateRandomContact(this.dice, this.contactTypes);
    this.capability = this.newContact.capability.name;
    this.reliability = this.newContact.reliability.name;
    this.availability = this.newContact.availability.name;
    this.reputation = this.newContact.reputation.name;
  }

  changeCapability() {
    if (this.capability !== '') {
      this.newContact.capability = this.categories.capabilities.find( c => c.name === this.capability);
    } else {
      this.newContact.capability = null;
    }
  }

  changeReputation() {
    if (this.reputation !== '') {
      this.newContact.reputation = this.categories.reputations.find( c => c.name === this.reputation);
    } else {
      this.newContact.reputation = null;
    }
  }

  changeReliability() {
    if (this.reliability !== '') {
      this.newContact.reliability = this.categories.reliabilities.find( c => c.name === this.reliability);
    } else {
      this.newContact.reliability = null;
    }
  }

  changeAvailability() {
    if (this.availability !== '') {
      this.newContact.availability = this.categories.availabilities.find( c => c.name === this.availability);
    } else {
      this.newContact.availability = null;
    }
  }
}
