import { BehaviorSubject, Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  BigLeagueContact,
  Cp2020PlayerContact,
  HotStuffArea,
  Cp2020PlayerContacts,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class Cp2020ContactsManagerService {
  private _contacts: BehaviorSubject<Cp2020PlayerContacts> =
    new BehaviorSubject<Cp2020PlayerContacts>(new Cp2020PlayerContacts());
  contacts: Observable<Cp2020PlayerContacts> = this._contacts.asObservable();

  private _skillLevel: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  skillLevel: Observable<number> = this._skillLevel.asObservable();

  private _initializeContacts: boolean = false;

  get bigLeagueTotalPoints(): Observable<number> {
    return this.skillLevel.pipe(map((level) => level * level * 4));
  }

  get spentBigLeaguePoints(): Observable<number> {
    return this.contacts.pipe(
      map((contacts) => contacts.bigLeague.reduce((a, b) => a + b.cost, 0))
    );
  }

  get hotStuffTotalPoints(): Observable<number> {
    return this.skillLevel.pipe(map((level) => level * level));
  }

  get spentHotStuffPoints(): Observable<number> {
    return this.contacts.pipe(
      map((contacts) => contacts.hotStuff.reduce((a, b) => a + b.points, 0))
    );
  }

  constructor() {}

  updateSkillLevel(level: number): void {
    this._skillLevel.next(level);
  }

  updateContacts(contacts: Cp2020PlayerContacts): void {
    this._contacts.next(new Cp2020PlayerContacts(contacts));
  }

  updateBigLeagueContacts(contacts: Array<BigLeagueContact>): void {
    const curr = this._contacts.getValue();
    curr.bigLeague = contacts.map((con) => new BigLeagueContact(con));
    this.updateContacts(curr);
  }

  updateHotStuffContacts(contacts: Array<HotStuffArea>): void {
    const curr = this._contacts.getValue();
    curr.hotStuff = contacts.map((con) => new HotStuffArea(con));
    this.updateContacts(curr);
  }

  updateOtherContacts(contacts: Array<Cp2020PlayerContact>): void {
    const curr = this._contacts.getValue();
    curr.other = contacts.map((con) => new Cp2020PlayerContact(con));
    this.updateContacts(curr);
  }
}
