import { BigLeagueCategories, BigLeagueContact } from './../../models';
import {
  faPlus,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, input, output } from '@angular/core';

@Component({
    selector: 'cs-cp2020-big-league-contact-new',
    templateUrl: './cp2020-big-league-contact-new.component.html',
    styleUrls: ['./cp2020-big-league-contact-new.component.css'],
    standalone: false
})
export class Cp2020BigLeagueContactNewComponent implements OnInit {
  maxPoints = input<number>(0);
  save = output<BigLeagueContact>();

  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;

  catagories = new BigLeagueCategories();
  isAdding = false;
  contact: BigLeagueContact = new BigLeagueContact();
  maximumPoints: number = 0;
  isDisabled: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isDisabled = this.setDisabled();
    this.maximumPoints = this.maxPoints();
  }

  setDisabled(): boolean {
    return (
      !this.contact.name ||
      !this.contact.reliability ||
      !this.contact.capability ||
      !this.contact.availability ||
      !this.contact.reputation ||
      this.contact.cost > this.maxPoints()
    );
  }

  addContact() {
    this.save.emit(this.contact);
  }
}
