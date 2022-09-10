import { HotStuffContact } from './hot-stuff-contact';
import { BigLeagueContact } from '.';
import { Cp2020Contact } from './cp2020-contact';

export interface CpContacts {
  other: Array<Cp2020Contact>;
  bigLeague: Array<BigLeagueContact>;
  hotStuff: Array<HotStuffContact>;
}
