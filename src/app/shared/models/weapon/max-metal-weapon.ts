import { SourceBook } from '../sourcebook';
import { MaxMetalAmmo, MaxMetalWeaponMount, VehicleWeapon } from '.';

export class MaxMetalWeapon implements VehicleWeapon {
  name: string;
  type: string;
  wpntype: string;
  wa: string;
  con: string;
  avail: string;
  ammo: MaxMetalAmmo;
  shots: string;
  rof: string;
  rel: string;
  range: number;
  notes: string;
  spaces: number;
  cost: number;
  source: SourceBook;
  mounting?: MaxMetalWeaponMount;
  extraLoads?: number;
  isStablized?: boolean;
  isAutoLoad?: boolean;
  count?: number;
  crew: number;

  constructor() {
    this.name = '',
    this.type = '',
    this.wpntype = '',
    this.wa = '',
    this.con = '',
    this.avail = '',
    this.shots = '',
    this.ammo = {name: '', damage: '', pen: '', burst: '', costPerLoad: 0, spacePerLoad: 0},
    this.rof = '',
    this.rel = '',
    this.range = 0,
    this.notes = '',
    this.spaces = 0,
    this.cost = 0,
    this.isAutoLoad = false,
    this.isStablized = false,
    this.mounting = {name: '', description: '', availability: '', cost: '', wa: '', spaces: 0, spacelimit: ''},
    this.source = {book: ''};
    this.extraLoads = 0;
    this.count = 1;
    this.crew = 0;
  }

  copy(weapon: VehicleWeapon) {
    this.name = weapon.name;
    this.type = weapon.type,
    this.wpntype = weapon.wpntype,
    this.wa = weapon.wa,
    this.con = weapon.con,
    this.avail = weapon.avail,
    this.shots = weapon.shots,
    this.ammo = weapon.ammo,
    this.rof = weapon.rof,
    this.rel = weapon.rel,
    this.range = weapon.range,
    this.notes = weapon.notes,
    this.spaces = weapon.spaces,
    this.cost = weapon.cost,
    this.source = weapon.source;
  }

  clone(): MaxMetalWeapon {
    const wpn = new MaxMetalWeapon();
    wpn.name = this.name;
    wpn.type = this.type,
    wpn.wpntype = this.wpntype,
    wpn.wa = this.wa,
    wpn.con = this.con,
    wpn.avail = this.avail,
    wpn.shots = this.shots,
    wpn.ammo = this.ammo,
    wpn.rof = this.rof,
    wpn.rel = this.rel,
    wpn.range = this.range,
    wpn.notes = this.notes,
    wpn.spaces = this.spaces,
    wpn.cost = this.cost,
    wpn.isAutoLoad = this.isAutoLoad,
    wpn.isStablized = this.isStablized,
    wpn.mounting = this.mounting,
    wpn.source = this.source;
    wpn.count = this.count;
    wpn.extraLoads = this.extraLoads;
    return wpn;
  }

  totalWA() {
    let mod = 0;
    if (this.isStablized) {
      mod = 2;
    }
    return this.wa + mod;

  }

  totalCost() {
    let total = this.cost;
    if (this.isStablized) {
      total += (this.cost * 0.5);
    }
    if (this.isAutoLoad) {
      total += (this.cost * 0.5);
    }
    if (isNaN(Number(this.mounting.cost))) {
      // parse and calculate
    } else {
      // if it is a negative number it is a multiplicator
      if (Number(this.mounting.cost) < 0) {
        total += (this.cost * Math.abs(Number(this.mounting.cost)));
      } else {
        total += Number(this.mounting.cost);
      }
    }
    if (this.extraLoads > 0) {
      total += (this.ammo.costPerLoad * this.extraLoads);
    }
    // determine cost of turret
    return total;
  }

  totalSpaces() {
    let total = this.spaces;
    if (this.isStablized) {
      total += (this.spaces * 0.5);
    }
    if (this.isAutoLoad) {
      total += (this.spaces * 0.25);
    }
    total = (total * this.mounting.spaces);
    if (this.extraLoads > 0) {
      total += (this.extraLoads * this.ammo.spacePerLoad);
    }
    return total;
  }

  toString(): string {
    let text = '';
    if (this.count > 1) {
      text = this.count + ' ';
    }
    text += this.mounting.name + '-mounted ';
    if (this.isStablized) {
      text += 'stabilized ';
    }
    text +=  this.name;
    if (this.isAutoLoad) {
      text += ' with autoloader';
    }
    if (this.extraLoads > 0 ) {
      text += ' (' + this.extraLoads + ' extra loads)';
    }
    return text;
  }
}
