export class Cp2020Stat {
  private _value: number;
  private _adjusted: number;
  private _multiplier?: number;
  private _woundMod: number;
  private _ev: number;
  modifiers: Array<StatModifier>;

  constructor() {
    this._value = 0;
    this._adjusted = 0;
    this._multiplier = 1;
    this._woundMod = 0;
    this._ev = 0;
    this.modifiers = new Array<StatModifier>();
  }

  get Base(): number {
    return this._value;
  }

  set Base(value: number) {
    this._value = value;
  }

  get Adjusted(): number {
    let val = this._value + this._adjusted + this._woundMod - this._ev;
    val += this.modifiers.reduce( (a, b) => a + b.mod, 0);
    val = Math.ceil(val * this._multiplier);
    return val;
  }

  set ev(value: number) {
    this._ev = value;
  }
  get ev(): number {
    return this._ev;
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
    str += this.modifiers.map( m => `${m.mod > -1 ? '+' + m.mod : m.mod}(${m.name}) `).join('');
    str += ` = ${this.Adjusted}`;

    return str;
  }
}

export interface StatModifier {
  name: string;
  mod: number;
}
