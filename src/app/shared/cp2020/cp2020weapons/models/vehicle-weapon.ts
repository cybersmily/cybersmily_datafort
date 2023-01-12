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

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.type = param?.type ?? '';
    this.wpntype = param?.wpntype ?? '';
    this.wa = param?.wa ?? '';
    this.con = param?.con ?? '';
    this.avail = param?.avail ?? '';
    this.ammo = param?.ammo ?? {
      name: '',
      damage: '',
      pen: '',
      burst: '',
      costPerLoad: 0,
      spacePerLoad: 0
    };
    this.shots = param?.shots ?? '';
    this.rof = param?.rof ?? '';
    this.rel = param?.rel ?? '';
    this.range = param?.range ?? 0;
    this.notes = param?.notes ?? '';
    this.spaces = param?.spaces ?? 0;
    this.cost = param?.cost ?? 0;
    this.source = param?.source ?? {book: '', page: 0};
  }
}
