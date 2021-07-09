import { NrDeckChassis } from './nr-deck-chassis';
import { NrDeck } from './nr-deck';
import { NrDeckOption } from './nr-deck-option';
import { NrProgram } from './nr-program';

export class Cp2020NetrunDeck implements NrDeck {
  name: string;
  type: NrDeckChassis;
  dataWall: number;
  speed: number;
  private _mu = 10;
  doubleMu: boolean;
  options: Array<NrDeckOption>;
  programs: Array<NrProgram>;
  description: string;
  codeGate: number;
  bookPrice: number;

  constructor(param?: any) {
    this.name = (param) ? param.name : '';
    this.type = (param) ? param.type : undefined;
    this.dataWall = (param) ? param.dataWall : 2;
    this.codeGate = (param) ? param.codeGate : 0;
    this.speed = (param) ? param.speed : 0;
    const mu = (param) ? Number(param._mu) : 10;
    this._mu = (isNaN(mu) ? 10 : mu);
    this.doubleMu = (param) ? param.doubleMu : false;
    this.options = (param) ? param.options : new Array<NrDeckOption>();
    this.programs = (param) ? param.programs : new Array<NrProgram>();
    this.description = (param) ? param.description : '';
    this.bookPrice = (param) ? param.bookPrice : 0;
  }

  get mu(): number {
    let mu = this._mu;
    mu += ((this.doubleMu) ? 10 : 0);
    mu += this.options.reduce( (a, b) => a + ((b.mods && b.mods['mu']) ? b.mods['mu'] * b.count : 0), 0);

    return mu;
  }

  set mu(value: number) {
    this._mu = (value > 0 ) ? value : 0;
  }

  get cost(): number {
    let basecost = 0;
    basecost = (this.type) ? this.type.cost : 0;
    basecost += ((this.dataWall - 2) * 1000);
    basecost += (this.speed > 0 ) ? (this.speed * 2000) : 0;
    basecost += (this.doubleMu) ? 5000 : 0;
      let optcost = 0;
      this.options.forEach( o => {
        if (isNaN(Number(o.cost)) && o.cost.toString().startsWith('*')) {
          let mod = 1;
          const value = Number(o.cost.toString().replace('*', ''));

          mod = (isNaN(value)) ? 0 : 0 + value;
          optcost += basecost * mod;
        } else {
          optcost += Number(o.cost) * ( o.count ? o.count : 1);
        }
      });
    return basecost + optcost;
  }

  get usedMu(): number {
    return this.programs.reduce( (a, b) => a + b.mu, 0);
  }

  get maxSpeed(): number {
    let spd = 5;
    spd += this.options.reduce( (a, b) => a + ((b.mods && b.mods['maxSpeed']) ? b.mods['maxSpeed'] * (b.count ? b.count : 1) : 0), 0);
    return spd;
  }

  updateOption(opt: NrDeckOption) {
    if (opt.count && opt.count > 0 ) {
      if (!this.options.some( (o: NrDeckOption) => o.name === opt.name)) {
        this.options.push(opt);
      } else {
        const i = this.options.findIndex( o => o.name === opt.name);
        this.options[i].count = opt.count;
      }
    } else {
      const i = this.options.findIndex( o => o.name === opt.name);
      this.options.splice(i, 1);
    }
    this.options.sort( (a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
  }

}
