import { MaxMetalVehicle } from './max-metal-vehicle';
export class MaxMetalOption {
  type: string;
  name: string;
  spaces: string;
  calcSpaces?: number;
  cost: string | number;
  calcCost?: number;
  mass?: string;
  avail?: string;
  source?: string;
  pg?: string;
  notes?: string;
  count?: number;

  constructor() {
    this.type = '';
    this.name = '';
    this.spaces = '';
    this.cost = 0;
    this.calcCost = 0;
    this.mass = '';
    this.avail = '';
    this.source = '';
    this.pg = '';
    this.notes = '';
    this.count = 1;
  }

  clone() {
    const opt = new MaxMetalOption();
    opt.type = this.type;
    opt.name = this.name;
    opt.spaces = this.spaces;
    opt.cost = this.cost;
    opt.calcCost = this.calcCost;
    opt.mass = this.mass;
    opt.avail =  this.avail;
    opt.source = this.source;
    opt.pg = this.pg;
    opt.notes =  this.notes;
    opt.count = this.count;
  }

  copy(option: MaxMetalOption) {
    this.type = option.type;
    this.name = option.name;
    this.spaces = option.spaces;
    this.cost = option.cost;
    this.calcCost = (option.calcCost) ? option.calcCost : 0;
    this.mass = (option.mass) ? option.mass : '';
    this.avail = (option.avail) ? option.avail : '';
    this.source = (option.source) ? option.source : '';
    this.pg = (option.pg) ? option.pg : '';
    this.notes = (option.notes) ? option.notes : '';
    this.count = (option.count) ? option.count : 1;
  }

  calculateCost(vehicle: MaxMetalVehicle): number {
    const total = Number(this.cost);
    // if the cost of the option is a string, it requires vehicle cost to calculate
    if (isNaN(total) && this.cost.toString().indexOf('*b') > 0) {
      const cost = this.cost.toString().split('*');
      const eb = Number(cost[0]);
      // get the modifier so 4*b is 4 times the base vehicle cost
      this.calcCost = vehicle.getBaseCost() * eb;
    } else {
      this.calcCost = (isNaN(total)) ? 0 : total;
    }
    return this.calcCost;
  }

  calculateSpaces(vehicle: MaxMetalVehicle): number {
    const total = Number(this.spaces);
    // if the cost of the option is a string, it requires vehicle cost to calculate
    if (isNaN(total) && this.spaces.toString().indexOf('*b') > 0) {
      const spaces = this.spaces.toString().split('*');
      const num = Number(spaces[0]);
      // get the modifier so 4*b is 4 times the base vehicle cost
    } else {
      this.calcSpaces = (isNaN(total)) ? 0 : total;
    }
    return this.calcSpaces;
  }

  toString(): string {
    let output = '';
    if (this.count > 1 ) {
      output += this.count + ' ';
    }
    output += this.name;
    return output;
  }

}
