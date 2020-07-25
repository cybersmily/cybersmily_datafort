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

  constructor(param?: any) {
    this.name = (param) ? param.name : '';
    this.type = (param) ? param.type : undefined;
    this.dataWall = (param) ? param.dataWall : 2;
    this.speed = (param) ? param.speed : 0;
    this._mu = (param) ? param._mu : 10;
    this.doubleMu = (param) ? param.doubleMu : false;
    this.options = (param) ? param.options : new Array<NrDeckOption>();
    this.programs = (param) ? param.programs : new Array<NrProgram>();
    this.description = (param) ? param.description : '';
  }

  get mu(): number {
    return this._mu + ((this.doubleMu) ? 10 : 0);
  }

  set mu(value: number) {
    this._mu = value;
  }

  get cost(): number {
    let basecost = 0;
    basecost = (this.type) ? this.type.cost : 0;
    basecost += ((this.dataWall - 2) * 1000);
    basecost += (this.speed * 2000);
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

  get deckOptionsString(): string {
    if (this.options.length > 0) {
      return this.options.map( o => {
        let result = o.name;
        if ( o.count && o.count > 1) {
          result = o.count + ' ' + result;
        }
        return result;
      }).join(', ');
    }
    return '';
  }
}
