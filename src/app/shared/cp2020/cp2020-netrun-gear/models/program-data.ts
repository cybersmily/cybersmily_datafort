import { Program } from './program';
import {Cp2020Program} from './cp2020-program';
import { ProgramOption } from './program-option';
export interface ProgramData {
  options: Array<ProgramOption>;
  classes: Array<ProgramOption>;
  programs: Array<Program>;
}

export interface Cp2020ProgramData {
  options: Array<ProgramOption>;
  classes: Array<ProgramOption>;
  programs: Array<Cp2020Program>;

}
