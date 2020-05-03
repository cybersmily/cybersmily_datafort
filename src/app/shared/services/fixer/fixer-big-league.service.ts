import { BigLeagueModel } from './../../models/fixer/big-league-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { BigLeagueContact } from './../../models/fixer/big-league-contact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixerBigLeagueService {
  private key = 'csdBigLeagueContacts';
  private _spentPoints = 0;
  private _curModel: BigLeagueModel = new BigLeagueModel();
  private _model = new BehaviorSubject<BigLeagueModel>(new BigLeagueModel());
  model: Observable<BigLeagueModel> = this._model.asObservable();

  constructor() {
    this._curModel = this.cache;
    this._model.next(this._curModel);
    this._spentPoints = this.calculatePoints();
  }

  setStreetdeal(streetdeal: number) {
    this._curModel.streetdeal = streetdeal;
    this.updateModel();
  }

  addContact(contact: BigLeagueContact) {
    if ( contact.cost + this.spentPoints <= this.totalPoints) {
      const c = new BigLeagueContact();
      c.name = contact.name;
      c.reputation = contact.reputation;
      c.availability = contact.availability;
      c.reliability = contact.reliability;
      c.capability = contact.capability;
      this._curModel.contacts.push(c);
      this.updateModel();
    }
  }
  deleteContact(index: number) {
    this._curModel.contacts.splice(index, 1);
    this.updateModel();
  }

  updateContact(contact: BigLeagueContact) {
    const i = this._curModel.contacts.findIndex(c => c.name === contact.name);
    this._curModel.contacts[i] = contact;
    this.updateModel();
  }

  get totalPoints(): number {
    if ( this._curModel && this._curModel.streetdeal) {
      return (this._curModel.streetdeal * 2) * (this._curModel.streetdeal * 2);
    }
    return 0;
  }

  get spentPoints(): number {
    return this._spentPoints;
  }

  get availablePoints(): number {
    return this.totalPoints - this._spentPoints;
  }

  reset() {
    this._curModel = new BigLeagueModel();
    this.updateModel();
  }

  private updateModel() {
    this._spentPoints = this.calculatePoints();
    this._model.next(this._curModel);
    this.cache = this._curModel;
  }

  private calculatePoints(): number {
    let sum = 0;
    if (this._curModel && this._curModel.contacts) {
      this._curModel.contacts.forEach(c => {
       sum += c.cost;
      });
    }
    return sum;
  }

  private get cache(): BigLeagueModel {
    const results = new BigLeagueModel();
    if (localStorage && localStorage[this.key]) {
      const storage = JSON.parse(localStorage[this.key]);
      results.streetdeal = storage.streetdeal;
      if ( storage.contacts) {
        storage.contacts.forEach(a => {
          const contact = new BigLeagueContact(a);
          results.contacts.push(contact);
        });
      }
    }
    return results;
  }

  private set cache(model: BigLeagueModel) {
    if (localStorage) {
      localStorage.setItem(this.key, JSON.stringify(model));
    }
  }

  toString(): string {
    let output = 'Big League Contacts\n';
    output += `Streetdeal: ${this._curModel.streetdeal}\n`;
    output += `Contact Points:\n`;
    output += `  spent - ${this.spentPoints}\n`;
    output += `  total - ${this.totalPoints}((${this._curModel.streetdeal}*2)*(${this._curModel.streetdeal}*2))\n`;
    output += `Points: ${this.spentPoints}/${this.totalPoints}\n`;
    output += 'Contacts:\n';
    this._curModel.contacts.forEach( c => {
      output += `  ${c.name} (`;
      output += `${c.capability.name}/`;
      output += `${c.reputation.name} rep/`;
      output += `${c.availability.name} available/`;
      output += `${c.reliability.name}/`;
      output += `${c.cost}pts)\n`;
      output += `  ${c.details}pts)\n\n`;
    });
    return output;
  }
}
