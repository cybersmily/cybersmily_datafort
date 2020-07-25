import { NrProgramOption } from './nr-program-option';
import { NrProgram } from './nr-program';

export class NetRunProgram implements NrProgram {
  name: string;
  description: string;
  icon: string;
  class: NrProgramOption;
  options: Array<NrProgramOption>;
  loaded:  boolean;
  private _str: number;

  constructor(param?: any) {
    this.name = (param && param.name) ? param.name : '';
    this.description = (param && param.description) ? param.description : '';
    this.icon = (param && param.icon) ? param.icon : '';
    this.class = (param && param.class) ? param.class : {};
    this.options = (param && param.options) ? param.options : new Array<NrProgramOption>();
    this.loaded = (param && param.loaded) ? true : false;
    this._str = (param && param._str) ? param._str : 0;
  }

  get strength(): number {
    return this._str;
  }

  set strength(value: number) {
    if (value < 0) {
      this._str = 0;
    } else if (value > 10) {
      this._str = 10;
    } else {
      this._str = value;
    }
  }

  get cost(): number {
    let cost: number = this.diff * 10;
    switch (this.class.name) {
      default:
        cost = cost * 1;
    }
    return cost;
  }

  get mu(): number {
    let mu = 0;
    if (this.diff < 16) {
      mu = 1;
    } else if (this.diff < 21) {
      mu = 2;
    } else if (this.diff < 26) {
      mu = 3;
    } else if (this.diff < 31) {
      mu = 4;
    } else if (this.diff < 36) {
      mu = 5;
    } else if (this.diff < 41) {
      mu =  6;
    } else if (this.diff > 40) {
      mu = 7;
    }
    if (this.options.some(o => o.name.toLowerCase().includes('code optimization'))) {
      mu = Math.ceil(mu / 2);
    }
    return mu;
  }

  get diff(): number {
    let diff: number = (this.class.diff) ? this.class.diff : 0;
    diff += this.strength;
    if (this.options.length > 0 ) {
      diff += this.options.reduce( (a, b) => a + b.diff, 0);
    }
    return diff;
  }

}
