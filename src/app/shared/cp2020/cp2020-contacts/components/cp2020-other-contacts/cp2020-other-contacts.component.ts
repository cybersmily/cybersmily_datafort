import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { KeyValue } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  input,
  output,
} from '@angular/core';
import { Cp2020PlayerContact } from '../../models';

@Component({
    selector: 'cs-cp2020-other-contacts',
    templateUrl: './cp2020-other-contacts.component.html',
    styleUrls: ['./cp2020-other-contacts.component.css'],
    standalone: false
})
export class Cp2020OtherContactsComponent implements OnInit, OnChanges {
  faRedo = faRedo;

  contacts = input<Array<Cp2020PlayerContact>>();
  updateContacts = output<Array<Cp2020PlayerContact>>();

  currContacts: Array<Cp2020PlayerContact> = new Array<Cp2020PlayerContact>();
  columnTwoIndex: number = -1;

  constructor() {}

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(): void {
    this.initialize();
  }

  initialize(): void {
    this.currContacts =
      this.contacts()?.map((contact) => new Cp2020PlayerContact(contact)) ??
      new Array<Cp2020PlayerContact>();
    this.columnTwoIndex = Math.ceil(this.currContacts.length / 2);

  }

  update(): void {
    this.updateContacts.emit(
      this.currContacts.map((contact) => new Cp2020PlayerContact(contact))
    );
    this.initialize();
  }

  edit(contact: KeyValue<number, Cp2020PlayerContact>): void {
    this.currContacts[contact.key] = contact.value;
    this.update();
  }

  delete(index: number): void {
    this.currContacts.splice(index, 1);
    this.update();
  }

  add(contact: Cp2020PlayerContact): void {
    this.currContacts.push(contact);
    this.update();
  }

  reset(): void {
    this.currContacts = new Array<Cp2020PlayerContact>();
    this.update();
  }
}
