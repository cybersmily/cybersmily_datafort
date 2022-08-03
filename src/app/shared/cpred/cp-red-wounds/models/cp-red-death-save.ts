import { CpRedStatMod } from './../../c-p-red-stats/models/cp-red-stat-mod';

export interface CpRedDeathSave {
  base: number;
  curr: number;
  modifiers: Array<CpRedStatMod>;
}
