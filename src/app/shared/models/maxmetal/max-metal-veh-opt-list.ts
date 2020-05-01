import { MaxMetalVehicle } from './max-metal-vehicle';
import { MaxMetalOption } from './max-metal-option';
export class MaxMetalVehOptList {
    options: MaxMetalOption[];

    constructor() {
        this.options = new Array<MaxMetalOption>();
    }

    addOption(option: MaxMetalOption) {
      const index = this.options.findIndex( o =>
        (o.name === option.name ));
      if ( index > -1) {
        this.options[index].count++;
      } else {
        option.count = 1;
        this.options.push(option);
      }
    }

    removeOption(option: MaxMetalOption) {
      const index = this.options.findIndex( o =>
        (o.name === option.name ));
      if ( index > -1) {
        if (this.options[index].count > 1) {
          this.options[index].count--;
        } else {
          this.options.splice(index, 1);
        }
      }
    }

    calculateCost(vehicle: MaxMetalVehicle): number {
      let total = 0;
      this.options.forEach( opt => {
        total += opt.calculateCost(vehicle);
      });
      return total;
    }

    calculateSpace(): number {
      let total = 0;
      this.options.forEach( opt => {
        if (isNaN( Number(opt.spaces))) {
          // do a calculation
        } else {
          total += Number(opt.spaces);
        }
      });
      return total;
    }
}

