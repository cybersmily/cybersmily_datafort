import { CpRedStatMod } from './../../c-p-red-stats/models/cp-red-stat-mod';
import { CpRedDeathSave } from './cp-red-death-save';
export class CpRedCharacterDeathSave implements CpRedDeathSave {
  base: number;
  curr: number;
  modifiers: Array<CpRedStatMod>;

  constructor(param?: any) {
    this.base = param?.base ?? 0;
    this.curr = param?.curr ?? this.base;
    this.modifiers = param?.modifiers ? [...param?.modifiers] : [];
  }
}
