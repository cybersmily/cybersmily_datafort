import { BigLeagueContact } from './big-league-contact';

export class BigLeagueModel {
  streetdeal: number;
  contacts: Array<BigLeagueContact>;

  constructor(){
    this.streetdeal = 0;
    this.contacts = new Array<BigLeagueContact>();
  }
}
