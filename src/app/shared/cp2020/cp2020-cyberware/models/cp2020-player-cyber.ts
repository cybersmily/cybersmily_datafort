import { DataCyberware } from './data-cyberware';

export class Cp2020PlayerCyber extends DataCyberware {
  hl: number;
  options?: Array<Cp2020PlayerCyber>;

  constructor(params?) {
    super(params);
    this.options = (params && params.options) ? params.options : undefined;
    this.hl = (params && params.hl) ? params.hl : 0;
    if (params && params.hc && this.hl === 0) {
      const lose = Number(params.hc);
      if (!isNaN(lose)) {
        this.hl = lose;
      } else {
        this.hl = null;
      }
    }
  }

  get totalCost(): number {
    let total = this.cost || 0;
    if (this.options && this.options.length > 0) {
      total += this.options.reduce((a, b) => a + (b.cost || 0), 0);
    }
    return total;
  }

  get totalHL(): number {
    let total = this.hl;
    if (this.options && this.options.length > 0) {
      total += this.options.reduce((a, b) => a + (b.hl || 0 ), 0);
    }
    return total;
  }

  toString(): string {
    let results = this.name;
    if (this.options && this.options.length > 0) {
      results = `${results} [${this.options.map(opt => opt.abbrev || opt.name).join(', ')}]`;
    }
    return results;
  }
}
