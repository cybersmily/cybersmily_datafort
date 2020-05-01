import { Cp2020PlayerGear } from './cp2020-player-gear';

export class Cp2020PlayerGearList {
  items: Array<Cp2020PlayerGear>;

  constructor(length: number) {
    this.items = Array.from({length: length}, () => (new Cp2020PlayerGear()));
  }

  get totalCost(): number {
    return this.items.reduce((a, b) => a + (b.cost || 0), 0);
  }

  get totalWeight(): number {
    return this.items.reduce((a, b) => a + (b.weight || 0), 0);
  }
}
