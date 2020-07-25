import { NrDeckChassis } from './nr-deck-chassis';
import { NrDeckOption } from './nr-deck-option';
import { NrProgram } from './nr-program';

export interface NrDeck {
  name: string;
  type: NrDeckChassis;
  dataWall: number;
  speed: number;
  mu: number;
  doubleMu: boolean;
  options: Array<NrDeckOption>;
  programs?: Array<NrProgram>;
  description: string;
}
