import { ProgramOption } from './program-option';
import { Program } from './program';

export class Cp2020Program implements Program {
  name: string;
  description: string;
  icon: string;
  class: ProgramOption;
  options: Array<ProgramOption>;
  loaded: boolean;
  private _str: number;
  bookMu?: number;
  bookCost?: number;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.description = param?.description ?? '';
    this.icon = param?.icon ?? '';
    if (typeof param?.class === 'string') {
      this.class = {
        name: param?.class,
        diff: param?.diff ?? 10,
        description: 'class not mapped properly.',
      };
    } else {
      this.class = param?.class ?? {};
    }
    this.options = param?.options ?? new Array<ProgramOption>();
    this.loaded = param?.loaded ?? false;
    this._str = param?._str ?? param?.str ?? 0;
    this.bookMu = param?.bookMu ?? param?.mu ?? undefined;
    this.bookCost = param?.bookCost ?? param?.cost ?? undefined;
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
    if (this.class?.costMod) {
      cost = cost * this.class.costMod;
    } else {
      const className: string = this.class.name;
      if (className) {
        switch (className.toLowerCase()) {
          case 'detection':
          case 'evasion':
          case 'stealth':
          case 'disguise':
          case 'alarm':
            return cost * 2;
          case 'compiler':
            return cost * 2.5;
          case 'anti-system':
            return cost * 3;
          case 'anti-program':
          case 'anti-program+':
          case 'anti-compiler (assassin)':
          case 'ambush':
          case 'doppleganger':
            return cost * 4;
          case 'anti-personnel':
          case 'anti-personnel+':
            return cost * 25;
          default:
            return cost * 1;
        }
      }
    }
    return cost * 1;
  }

  get mu(): number {
    let mu = Math.ceil((this.diff - 10) / 5);
    if (
      this.options.some((o) =>
        o.name?.toLowerCase()?.includes('code optimization')
      )
    ) {
      mu = Math.ceil(mu / 2);
    }
    return mu < 0 ? 0 : mu;
  }

  get diff(): number {
    let diff: number = this.class?.diff ? this.class.diff : 0;
    diff += this.strength;
    if (this.options?.length > 0) {
      diff += this.options.reduce((a, b) => a + b.diff, 0);
    }
    return diff;
  }
}
