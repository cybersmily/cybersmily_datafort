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
  wa: string | number;
  conc?: string;
  avail?: string;
  ammo?: string | Ammo;
  damage?: string;
  shots?: string | number;
  rof?: string | number;
  rel?: string;
  range?: number;
  cost?: string | number;
  notes?: string;
  source?: SourceBook;
}


