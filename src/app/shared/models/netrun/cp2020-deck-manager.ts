import { Cp2020ProgramList } from './cp2020-program-list';
import { Cp2020NetrunDeck } from './cp2020-netrun-deck';
import { NrDeckManager } from './nr-deck-manager';

export class Cp2020DeckManager implements NrDeckManager {
  deck: Cp2020NetrunDeck = new Cp2020NetrunDeck();
  programList: Cp2020ProgramList = new Cp2020ProgramList();

  constructor(param?: NrDeckManager) {
    if (param) {
      this.deck = new Cp2020NetrunDeck(param.deck);
      this.programList = new Cp2020ProgramList(param.programList);
    } else {
      this.programList = new Cp2020ProgramList();
      this.deck = new Cp2020NetrunDeck();
    }
  }
}
