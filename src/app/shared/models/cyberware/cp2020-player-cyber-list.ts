import { Cp2020PlayerCyber } from './cp2020-player-cyber';

export class Cp2020PlayerCyberList {
    items: Array<Cp2020PlayerCyber>;

    constructor(length?: number) {
      if (length && length > 0) {
        this.items = Array.from({length: length}, () => (new Cp2020PlayerCyber()));
      } else {
        this.items = new Array<Cp2020PlayerCyber>();
      }
    }

    get totalHL(): number {
        return this.items.reduce((a, b) => a + (b.totalHL || 0), 0);
    }

    get totalCost(): number {
        return this.items.reduce((a, b) => a + (( b.totalCost && (typeof b.totalCost === 'number')) ? b.totalCost : 0), 0);
    }
}
