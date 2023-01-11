import { Cp2020PlayerCyber } from './cp2020-player-cyber';

export class Cp2020PlayerCyberList {
    items: Array<Cp2020PlayerCyber>;
    locations: Array<string>;

    constructor(param?: any) {
      if(typeof param === 'number') {
        this.items = Array.from({length: length}, () => (new Cp2020PlayerCyber()));
        this.locations = new Array<string>();
      } else {
        this.items = param?.items?.map(cyber => new Cp2020PlayerCyber(cyber)) ?? new Array<Cp2020PlayerCyber>();
        this.locations = param?.locations ?? new Array<string>();
      }
    }

    get totalHL(): number {
        return this.items.reduce((a, b) => a + (b.totalHL || 0), 0);
    }

    get totalCost(): number {
        return this.items.reduce((a, b) => a + (( b.totalCost && (typeof b.totalCost === 'number')) ? b.totalCost : 0), 0);
    }
}
