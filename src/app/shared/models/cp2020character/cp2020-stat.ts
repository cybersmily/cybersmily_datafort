export class Cp2020Stat {
  private _value: number;
  private _adjusted: number;
  private _multiplier?: number;
  private _woundMod: number;
  private _ev: number;

  constructor() {
    this._value = 0;
    this._adjusted = 0;
    this._multiplier = 1;
    this._woundMod = 0;
    this._ev = 0;
  }

  get Base(): number {
    return this._value;
  }

  set Base(value: number) {
    this._value = value;
  }

  get Adjusted(): number {
    const val = Math.ceil((this._value + this._adjusted + this._woundMod - this._ev) * this._multiplier);
    return val;
  }

  set ev(value: number) {
    this._ev = value;
  }

  set Modifier(value: number) {
    this._adjusted = value;
  }
  get Modifier(): number {
    return this._adjusted;
  }

  set Multiplier(value: number) {
    this._multiplier = value;
  }

  get Multiplier(): number {
    return this._multiplier;
  }

  set WoundModifier(value: number) {
    this._woundMod = value;
  }

  get WoundModifier(): number {
    return this._woundMod;
  }

  toString(): string {
    let str = `${this.Base}(base) `;
    if (this._adjusted > 0) {
      str += `${this._adjusted}(modifier) `;
    }
    if (this._ev > 0) {
      str += `-${this._ev}(ev) `;
    }
    if (this._woundMod !== 0) {
      str += `${this._woundMod}(wound) `;
    }
    if (this._multiplier !== 0 && this._multiplier !== 1) {
      str += `x${this._multiplier}(wound) `;
    }
    str += ` = ${this.Adjusted}`;
    return str;
  }
}
