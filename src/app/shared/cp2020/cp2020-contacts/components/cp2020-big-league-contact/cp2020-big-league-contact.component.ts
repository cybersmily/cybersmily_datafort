import { BigLeagueCategories, BigLeagueContact } from './../../models';
import {
  faPen,
  faTrash,
  faSave,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, output, input } from '@angular/core';

@Component({
    selector: 'cs-cp2020-big-league-contact',
    templateUrl: './cp2020-big-league-contact.component.html',
    styleUrls: ['./cp2020-big-league-contact.component.css'],
    standalone: false
})
export class Cp2020BigLeagueContactComponent implements OnInit {
  contact = input(new BigLeagueContact());
  index =  input(-1);

  delete = output<number>();
  edit =  output<{ index: number; contact: BigLeagueContact }>();

  faPen = faPen;
  faTrash = faTrash;
  faSave = faSave;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  editMode = false;
  isCollapse = true;
  catagories = new BigLeagueCategories();
  currContact: BigLeagueContact = new BigLeagueContact();

  constructor() {}

  ngOnInit() {
    this.currContact = new BigLeagueContact(this.contact());
    console.log('contact', this.currContact);
  }

  deleteContact() {
    this.delete.emit(this.index());
  }

  editContact() {
    this.editMode = true;
  }

  saveContact() {
    this.editMode = false;
    this.edit.emit({ index: this.index(), contact: this.currContact });
  }
}
