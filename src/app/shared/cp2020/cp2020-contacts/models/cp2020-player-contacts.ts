import { HotStuffArea } from './hot-stuff-area';
import { CpContacts } from './cp-contacts';
import { BigLeagueContact } from '.';
import { Cp2020PlayerContact } from './cp2020-player-contact';

export class Cp2020PlayerContacts implements CpContacts {
  other: Array<Cp2020PlayerContact>;
  bigLeague: Array<BigLeagueContact>;
  hotStuff: Array<HotStuffArea>;

  constructor(param?: any) {
    this.other =
      param?.other?.map((contact) => contact) ??
      new Array<Cp2020PlayerContact>();
    this.bigLeague =
      param?.bigLeague?.map((contact) => new BigLeagueContact(contact)) ??
      new Array<BigLeagueContact>();
    this.hotStuff =
      param?.hotStuff?.map((contact) => new HotStuffArea(contact)) ??
      new Array<HotStuffArea>();
  }
}
