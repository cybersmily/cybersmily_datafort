import {
  faPen,
  faTrash,
  faSave,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerContact } from './../../models/cp2020-player-contact';
import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
    selector: 'cs-cp2020-other-contact',
    templateUrl: './cp2020-other-contact.component.html',
    styleUrls: ['./cp2020-other-contact.component.css'],
    standalone: false
})
export class Cp2020OtherContactComponent implements OnInit, OnChanges {
  faPen = faPen;
  faTrash = faTrash;
  faSave = faSave;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  contact = input<Cp2020PlayerContact>();
  index = input<number>();
  delete = output<number>();
  edit = output<KeyValue<number, Cp2020PlayerContact>>();

  isCollapse = true;
  isEditMode = false;
  currContact: Cp2020PlayerContact = new Cp2020PlayerContact();

  ngOnInit(): void {
    this.currContact = new Cp2020PlayerContact(this.contact());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currContact = new Cp2020PlayerContact(this.contact());
  }

  deleteContact(): void {
    this.delete.emit(this.index());
  }

  saveContact(): void {
    this.isEditMode = false;
    this.isCollapse = true;
    this.edit.emit({
      key: this.index(),
      value: new Cp2020PlayerContact(this.currContact),
    });
  }
}
