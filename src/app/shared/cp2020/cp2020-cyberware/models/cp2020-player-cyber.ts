import { DataCyberware } from './data-cyberware';
import { v4 as uuidv4 } from 'uuid';


export class Cp2020PlayerCyber extends DataCyberware {
  hl: number;
  id?: string;
  location?: string;
  options?: Array<Cp2020PlayerCyber>;

  constructor(params?:any) {
    super(params);
    this.id = params?.id ?? new uuidv4();
    this.location = params?.location ?? '';
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

  getOptionListAsString(): string {
    return this.options.map(opt => opt.name).join(', ');
  }

  getOptionNotesAsString(separator: string): string {
    return this.options?.map(opt => `${opt.name} - ${opt.notes}` ).join(`${separator}`) ?? '';
  }

  toString(): string {
    let results = this.name;
    if (this.options && this.options.length > 0) {
      results = `${results} [${this.getOptionListAsString()}]`;
    }
    return results;
  }
}
