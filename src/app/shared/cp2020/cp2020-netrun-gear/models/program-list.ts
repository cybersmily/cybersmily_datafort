import { Cp2020Program } from './cp2020-program';
export interface ProgramList {
  programs: Array<Cp2020Program>;
  usedMU: number;
  totalCost: number;
}
