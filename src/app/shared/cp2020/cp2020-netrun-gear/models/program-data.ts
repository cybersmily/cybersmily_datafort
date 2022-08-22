import { Program } from './program';
import { ProgramOption } from './program-option';
export interface ProgramData {
  options: Array<ProgramOption>;
  classes: Array<ProgramOption>;
  programs: Array<Program>;
}
