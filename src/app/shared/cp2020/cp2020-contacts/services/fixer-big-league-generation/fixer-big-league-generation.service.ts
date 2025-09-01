import { DiceService } from './../../../../services/dice/dice.service';
import { BigLeagueContact, BigLeagueCategories } from './../../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FixerBigLeagueGenerationService {
  constructor() {}

  /**
   * Generate a random list of contacts based on the available points
   * and add it to the current contact list.   *
   * @param {DiceService} dice
   * @param {Array<string>} contactTypes
   * @memberof FixerBigLeagueService
   */
  generateContactList(
    dice: DiceService,
    contactTypes: Array<string>,
    availablePoints: number
  ): Array<BigLeagueContact> {
    const list = new Array<BigLeagueContact>();
    while (availablePoints >= 1) {
      const contact = this.generateRandomContact(dice, contactTypes);
      if (contact.cost - availablePoints < 0) {
        list.push(contact);
        availablePoints -= contact.cost;
      }
    }
    return list;
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
  generateRandomContact(
    dice: DiceService,
    contactTypes: Array<string>
  ): BigLeagueContact {
    const categories = new BigLeagueCategories();
    const contact = new BigLeagueContact();
    contact.name =
      contactTypes[dice.generateNumber(0, contactTypes.length - 1)];
    contact.capability =
      categories.capabilities[
        dice.generateNumber(0, categories.capabilities.length - 1)
      ];
    contact.availability =
      categories.availabilities[
        dice.generateNumber(0, categories.availabilities.length - 1)
      ];
    contact.reliability =
      categories.reliabilities[
        dice.generateNumber(0, categories.reliabilities.length - 1)
      ];
    contact.reputation =
      categories.reputations[
        dice.generateNumber(0, categories.reputations.length - 1)
      ];
    console.log('contact', contact);
    return contact;
  }
}
