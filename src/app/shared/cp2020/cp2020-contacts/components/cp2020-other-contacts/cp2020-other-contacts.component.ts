import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { KeyValue } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
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

  @Input()
  contacts: Array<Cp2020PlayerContact> = new Array<Cp2020PlayerContact>();

  currContacts: Array<Cp2020PlayerContact> = new Array<Cp2020PlayerContact>();

  @Output()
  updateContacts: EventEmitter<Array<Cp2020PlayerContact>> = new EventEmitter<
    Array<Cp2020PlayerContact>
  >();

  get columnOne(): Array<Cp2020PlayerContact> {
    return this.currContacts.slice(0, this.columnTwoIndex);
  }

  get columnTwo(): Array<Cp2020PlayerContact> {
    return this.currContacts.slice(this.columnTwoIndex);
  }

  get columnTwoIndex(): number {
    return Math.ceil(this.currContacts.length / 2);
  }

  constructor() {}

  ngOnInit(): void {
    this.currContacts =
      this.contacts?.map((contact) => new Cp2020PlayerContact(contact)) ??
      new Array<Cp2020PlayerContact>();
  }

  ngOnChanges(): void {
    this.currContacts =
      this.contacts?.map((contact) => new Cp2020PlayerContact(contact)) ??
      new Array<Cp2020PlayerContact>();
  }

  update(): void {
    this.updateContacts.emit(
      this.currContacts.map((contact) => new Cp2020PlayerContact(contact))
    );
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
