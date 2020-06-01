import { Ammo } from './ammo';
import { BaseWeapon } from './base-weapon';
import { SourceBook } from '../sourcebook';
/**
 * Cyberpunk Weapon stats.
 * @export
 * @interface CpWeapon
 */
export interface CpWeapon extends BaseWeapon {
  name: string;
  type: string;
  category?: string;
  subcategory?: string;
  wa: string | number;
  conc?: string;
  avail?: string;
  ammo?: string | Ammo;
  damage?: string;
  burst?: string | number;
  shots?: string | number;
  bod?: number;
  rof?: string | number;
  fullAuto?: boolean;
  burstFire?: boolean;
  rel?: string;
  range?: number | string;
  thrown?: boolean;
  cost?: string | number;
  notes?: string;
  source?: SourceBook;
}
