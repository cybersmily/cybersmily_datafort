import { Cp2020PlayerGear } from './cp2020-player-gear';

export class Cp2020PlayerGearList {
  items: Array<Cp2020PlayerGear>;
  locations: Array<string>;

  constructor(param?: any) {
    if (typeof param === 'number') {
      this.items = new Array<Cp2020PlayerGear>(param).fill(new Cp2020PlayerGear());
      this.locations = new Array<string>();
    } else {
      this.items = param?.items.map(item => new Cp2020PlayerGear(item)) ?? new Array<Cp2020PlayerGear>(2);
      this.locations = param?.locations ?? new Array<string>();
    }
  }

  get totalCost(): number {
    return this.items.reduce((a, b) => a + (b.cost || 0), 0);
  }

  get totalWeight(): number {
    return this.items.reduce((a, b) => a + (b.weight || 0), 0);
  }
}
