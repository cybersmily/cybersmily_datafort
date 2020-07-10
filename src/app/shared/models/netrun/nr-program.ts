import { NrProgramOption } from './nr-program-option';

export interface NrProgram {
  name: string;
  class: NrProgramOption;
  options:  Array<NrProgramOption>;
  strength: number;
  description: string;
  cost: number;
  diff: number;
  mu: number;
  icon: string;
}
