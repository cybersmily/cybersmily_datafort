import {
  faPen,
  faTrash,
  faSave,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerContact } from './../../models/cp2020-player-contact';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
    selector: 'cs-cp2020-other-contact',
    templateUrl: './cp2020-other-contact.component.html',
    styleUrls: ['./cp2020-other-contact.component.css'],
    standalone: false
})
export class Cp2020OtherContactComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faSave = faSave;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  isCollapse = true;
  isEditMode = false;

  @Input()
  contact: Cp2020PlayerContact = new Cp2020PlayerContact();
  currContact: Cp2020PlayerContact = new Cp2020PlayerContact();

  @Input()
  index: number = -1;

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  edit: EventEmitter<KeyValue<number, Cp2020PlayerContact>> = new EventEmitter<
    KeyValue<number, Cp2020PlayerContact>
  >();

  constructor() {}

  ngOnInit(): void {
    this.currContact = new Cp2020PlayerContact(this.contact);
  }

  deleteContact(): void {
    this.delete.emit(this.index);
  }

  saveContact(): void {
    this.isEditMode = false;
    this.isCollapse = true;
    this.edit.emit({
      key: this.index,
      value: new Cp2020PlayerContact(this.currContact),
    });
  }
}
