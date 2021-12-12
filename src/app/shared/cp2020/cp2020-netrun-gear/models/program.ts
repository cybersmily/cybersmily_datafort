import { SourceBook } from './../../../models/sourcebook';
import { ProgramOption } from './program-option';

export interface Program {
  name: string;
  class: ProgramOption;
  options:  Array<ProgramOption>;
  strength: number;
  description: string;
  cost: number;
  diff: number;
  mu: number;
  icon: string;
  source?: SourceBook;
}
