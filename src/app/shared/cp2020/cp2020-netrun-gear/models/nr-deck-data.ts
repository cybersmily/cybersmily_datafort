import { NrDeckChassis } from './nr-deck-chassis';
import { NrDeckOption } from './nr-deck-option';

export interface NrDeckData {
  chassis: Array<NrDeckChassis>;
  options: Array<NrDeckOption>;
}
