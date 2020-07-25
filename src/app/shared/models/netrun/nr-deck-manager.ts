import { NrProgramList } from './nr-program-list';
import { NrDeck } from './nr-deck';

export interface NrDeckManager {
  deck: NrDeck;
  programList: NrProgramList;
}
