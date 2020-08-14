import { DataWeapon } from './data-weapon';
import { CpPlayerWeapon } from './cp-player-weapon';
export class CpPlayerWeaponList {
  items: Array<CpPlayerWeapon>;

  constructor(length?: number) {
    if (length) {
      this.items = Array.from({ length: length }, () => new CpPlayerWeapon());
    } else {
      this.items = new Array<CpPlayerWeapon>();
    }
  }

  get totalCost(): number {
    return this.items.reduce((a, b) => (a += b.cost), 0);
  }

  deleteWeapon(index: number) {
    if (!isNaN(Number(index)) && index > -1) {
      this.items.splice(index, 1);
    }
  }

  addWeapon(weapon: CpPlayerWeapon) {
    this.items.push(weapon);
  }

  addDataWeapon(weapon: DataWeapon) {
    this.items.push(new CpPlayerWeapon(weapon));
  }

  addPlayerWeaponList(weapons: Array<CpPlayerWeapon>) {
    weapons.forEach((wpn) => this.addWeapon(wpn));
  }

  addDataWeaponList(weapons: Array<DataWeapon>) {
    if (weapons && weapons.length > 0) {
      weapons.forEach((wpn) => {
        this.addDataWeapon(wpn);
      });
    }
  }

  updateWeapon(index: number, weapon: CpPlayerWeapon) {
    if (!isNaN(Number(index)) && index > -1 && weapon) {
      this.items[index] = weapon;
    }
  }
}
