import { CpWeapon } from './cp-weapon';
import { SourceBook } from '../../../models/sourcebook';
import { MaxMetalAmmo } from './max-metal-ammo';

export interface VehicleWeapon extends CpWeapon {
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
}

export class Cp2020VehicleWeapon implements VehicleWeapon{
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

  constructor() {
    this.name = '';
    this.type = '';
    this.wpntype = '';
    this.wa = '';
    this.con = '';
    this.avail = '';
    this.ammo ={
      name: '',
      damage: '',
      pen: '',
      burst: '',
      costPerLoad: 0,
      spacePerLoad: 0
    };
    this.shots = '';
    this.rof = '';
    this.rel = '';
    this.range = 0;
    this.notes = '';
    this.spaces = 0;
    this.cost = 0;
    this.source = {book: '', page: 0};
  }
}
