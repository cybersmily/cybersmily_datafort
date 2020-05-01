import { Cp2020PlayerCyber } from './cp2020-player-cyber';

export class Cp2020PlayerCyberList {
    items: Array<Cp2020PlayerCyber>;

    constructor(length: number) {
        this.items = Array.from({length: length}, () => (new Cp2020PlayerCyber()));
    }

    get totalHL(): number {
        return this.items.reduce((a, b) => a + (b.hl || 0), 0);
    }

    get totalCost(): number {
        return this.items.reduce((a, b) => a + (( b.cost && (typeof b.cost === 'number')) ? b.cost : 0), 0);
    }
}
