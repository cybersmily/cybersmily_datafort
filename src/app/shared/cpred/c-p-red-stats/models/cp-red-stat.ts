import { CpRedStatMod } from './cp-red-stat-mod';

export interface CpRedStat {
  name: string;
  base: number;
  modified: number;
  modifiers: Array<CpRedStatMod>;
}
