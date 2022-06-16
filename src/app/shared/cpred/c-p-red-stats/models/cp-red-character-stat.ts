import { CpRedStatMod } from './cp-red-stat-mod';
import { CpRedStat } from './cp-red-stat';
import { CalculateCpRedStatModified } from '../functions/calculate-cp-red-stat-modified';

export class CpRedCharacterStat implements CpRedStat {
  name: string;
  base: number;
  modified: number;
  modifiers: Array<CpRedStatMod>;

  constructor(params?: any) {
    this.name = params?.name ?? '';
    this.base = params?.base ?? 0;
    this.modifiers = params?.modifiers
      ? [...params.modifiers]
      : new Array<CpRedStatMod>();
    this.modified = CalculateCpRedStatModified(this);
  }
}
