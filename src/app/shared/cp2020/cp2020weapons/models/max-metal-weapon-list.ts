import { MaxMetalWeapon } from './max-metal-weapon';

export class MaxMetalWeaponList {
  weapons: MaxMetalWeapon[];

  constructor() {
    this.weapons = new Array<MaxMetalWeapon>();
  }

  addWeapon( weapon: MaxMetalWeapon) {
    const index = this.weapons.findIndex( wpn =>
      wpn.name === weapon.name
      && wpn.mounting.name === weapon.mounting.name
      && wpn.isAutoLoad === weapon.isAutoLoad
      && wpn.isStablized === weapon.isStablized);
    if (index > -1) {
      this.weapons[index].count++;
    } else {
      // create a new object and add to the array.
      const wpn = weapon.clone();
      this.weapons.push(wpn);
    }
  }

  removeWeapon( weapon: MaxMetalWeapon) {
    const index = this.weapons.findIndex( wpn => wpn.name === weapon.name && wpn.mounting.name === weapon.mounting.name);
    if (index > -1) {
      if (this.weapons[index].count > 1) {
        this.weapons[index].count--;
      } else {
        this.weapons.splice(index, 1);
      }
    }
  }

  calculateSpace(): number {
    let spaces = 0;
    this.weapons.forEach( wpn => {
      const spc = Number(wpn.totalSpaces());
      if (!isNaN(spc)) {
        const count = (wpn.count) ? wpn.count : 1;
        spaces += (spc * count);
      } else {
        // TODO: convert string formula
      }
    });
    return spaces;
  }

  calculateCost(): number {
    let cost = 0;
    this.weapons.forEach( wpn => {
      const price = Number(wpn.totalCost());
      if (!isNaN(price)) {
        const count = (wpn.count) ? wpn.count : 1;
        cost += (price * count);
      } else {
        // TODO: convert string formula
      }
    });
    return cost;
  }
}
