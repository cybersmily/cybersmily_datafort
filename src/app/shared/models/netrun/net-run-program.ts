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
  bookMu?: number;
  bookCost?: number;

  constructor(param?: any) {
    this.name = (param && param.name) ? param.name : '';
    this.description = (param && param.description) ? param.description : '';
    this.icon = (param && param.icon) ? param.icon : '';
    this.class = (param && param.class) ? param.class : {};
    this.options = (param && param.options) ? param.options : new Array<NrProgramOption>();
    this.loaded = (param && param.loaded) ? true : false;
    this._str = (param) ? ((param._str) ? param._str : (param.str)? param.str : 0): 0;
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
    const className:string = this.class.name;
    if(className) {
    switch (className.toLowerCase()) {
      case "detection":
      case "evasion":
      case "stealth":
      case "disguise":
      case "alarm":
        return cost * 2;
      case "compiler":
        return cost * 2.5;
      case "anti-system":
        return cost * 3;
      case "anti-program":
      case "anti-program+":
      case "anti-compiler (assassin)":
      case "ambush":
      case "doppleganger":
        return cost * 4;
      case "anti-personnel":
      case "anti-personnel+":
        return cost * 25;
      default:
        return cost * 1;
    }
    }
    return cost * 1;
  }

  get mu(): number {
    let mu = Math.ceil((this.diff - 10)/ 5);
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
