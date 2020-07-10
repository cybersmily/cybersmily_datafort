import { NrDeckOption } from './nr-deck-option';
import { NrProgram } from './nr-program';

export interface NrDeck {
  name: string;
  dataWall: number;
  speed: number;
  options: Array<NrDeckOption>;
  description: string;
  mu: number;
  programs?: Array<NrProgram>;
}
