import { CpRedStatMod } from './cp-red-stat-mod';

export interface CpRedStat {
  base: number;
  modifiers: Array<CpRedStatMod>;
}

export class CpRedCharacterStat implements CpRedStat {
  private _base: number;
  private _modified: number;
  private _modifiers: Array<CpRedStatMod>;

  constructor(params?: CpRedStat) {
    this._modifiers = (params && params.base) ? [...params.modifiers] : new Array<CpRedStatMod>();
    this.base = (params && params.base) ? params.base : 1;
  }

  get base(): number {
    return this._base;
  }

  set base(value: number) {
    this._base = ( value && value > 0) ? value : 1;
    this._modified = this._base + this._modifiers.reduce( (a, b) => a + b.value, 0);
  }

  get modified(): number {
    return  this._modified;
  }

  get modifiers(): Array<CpRedStatMod> {
    return this._modifiers;
  }

  addModifier(mod: CpRedStatMod) {
    const found = this._modifiers.find( m => m.name.toLocaleLowerCase() === mod.name.toLocaleLowerCase());
    if (!found) {
      this._modifiers.push(mod);
      this._modified += mod.value;
    }
  }

  removeModifier(name: string) {
    const index = this._modifiers.findIndex( m => m.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (index > -1) {
      this._modifiers.splice(index, 1);
    }
  }

  clearModifiers() {
    this._modifiers = new Array<CpRedStatMod>();
    this._modified = this._base;
  }

}
