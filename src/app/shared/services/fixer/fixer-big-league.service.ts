import { BigLeagueCategories } from './../../models/fixer/big-league-categories';
import { DiceService } from './../dice/dice.service';
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


  /**
   * Sets the current streetdeal level and updates the observable model
   *
   * @param {number} streetdeal
   * @memberof FixerBigLeagueService
   */
  setStreetdeal(streetdeal: number) {
    this._curModel.streetdeal = streetdeal;
    this.updateModel();
  }


  /**
   * Add a bigLeagueContact to the current list of contact.
   * Will not add if there is not enough available points.
   *
   * @param {BigLeagueContact} contact
   * @memberof FixerBigLeagueService
   */
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


  /**
   * Removes the contact at the index from the current contact list.
   *
   * @param {number} index
   * @memberof FixerBigLeagueService
   */
  deleteContact(index: number) {
    this._curModel.contacts.splice(index, 1);
    this.updateModel();
  }


  /**
   * removes the contact based on name and total cost.
   * If there are mutliples same name and cost, then first one found.
   * @param {BigLeagueContact} contact
   * @memberof FixerBigLeagueService
   */
  updateContact(contact: BigLeagueContact) {
    const i = this._curModel.contacts.findIndex(c => c.name === contact.name && c.cost === contact.cost && c.details === contact.details);
    this._curModel.contacts[i] = contact;
    this.updateModel();
  }


  /**
   * Generate a random list of contacts based on the available points
   * and add it to the current contact list.   *
   * @param {DiceService} dice
   * @param {Array<string>} contactTypes
   * @memberof FixerBigLeagueService
   */
  generateContactList(dice: DiceService, contactTypes: Array<string>, ) {
    while(this.availablePoints >= 1) {
      const contact = this.generateRandomContact(dice, contactTypes);
      this.addContact(contact);
    }
  }

  /**
   * Generate a random contact.
   *
   * @private
   * @param {DiceService} dice
   * @param {Array<string>} contactTypes
   * @return {*}  {BigLeagueContact}
   * @memberof FixerBigLeagueService
   */
  generateRandomContact(dice: DiceService, contactTypes: Array<string>): BigLeagueContact {
    const categories = new BigLeagueCategories();
    const contact = new BigLeagueContact();
    contact.name = contactTypes[dice.generateNumber(0, contactTypes.length - 1)];
    contact.capability = categories.capabilities[dice.generateNumber(0, categories.capabilities.length - 1)];
    contact.availability = categories.availabilities[dice.generateNumber(0, categories.availabilities.length - 1)];
    contact.reliability = categories.reliabilities[dice.generateNumber(0, categories.reliabilities.length - 1)];
    contact.reputation = categories.reputations[dice.generateNumber(0, categories.reputations.length - 1)];
    return contact;
  }


  /**
   * returns the total number of points a fixer would have to spend
   *
   * @readonly
   * @type {number}
   * @memberof FixerBigLeagueService
   */
  get totalPoints(): number {
    if ( this._curModel && this._curModel.streetdeal) {
      return (this._curModel.streetdeal * 2) * (this._curModel.streetdeal * 2);
    }
    return 0;
  }


  /**
   * retunrs the current spent Contact Points for the contacts
   *
   * @readonly
   * @type {number}
   * @memberof FixerBigLeagueService
   */
  get spentPoints(): number {
    return this._spentPoints;
  }


  /**
   * returns the available Contact Points that can be spent.
   *
   * @readonly
   * @type {number}
   * @memberof FixerBigLeagueService
   */
  get availablePoints(): number {
    return this.totalPoints - this._spentPoints;
  }


  /**
   * Resets the current BigLeague model to a new instance.
   *
   * @memberof FixerBigLeagueService
   */
  reset() {
    this._curModel = new BigLeagueModel();
    this.updateModel();
  }


  /**
   * updates the model and current cache of it.
   *
   * @private
   * @memberof FixerBigLeagueService
   */
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


  /**
   * Gets the current BigLeague model from localStorage
   *
   * @private
   * @type {BigLeagueModel}
   * @memberof FixerBigLeagueService
   */
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


  /**
   * Sets the localStorage with the current BigLeague model.
   *
   * @private
   * @memberof FixerBigLeagueService
   */
  private set cache(model: BigLeagueModel) {
    if (localStorage) {
      localStorage.setItem(this.key, JSON.stringify(model));
    }
  }


  /**
   * Converts the current BigLeague model into a string.
   *
   * @return {*}  {string}
   * @memberof FixerBigLeagueService
   */
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
