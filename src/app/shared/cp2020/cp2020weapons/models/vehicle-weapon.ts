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
