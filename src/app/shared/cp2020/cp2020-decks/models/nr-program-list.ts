import { NetRunProgram } from './net-run-program';
export interface NrProgramList {
  programs: Array<NetRunProgram>;
  usedMU: number;
  totalCost: number;
}
