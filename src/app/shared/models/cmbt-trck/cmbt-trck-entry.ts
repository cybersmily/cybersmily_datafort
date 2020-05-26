import { ArmorLayer } from '../armor/armor-layer';
import { CpWeapon } from '../weapon/cp-weapon';

export interface CmbtTrckEntry {
  name: string;
  armor?: ArmorLayer;
  ev?: number;
  choices?: Array<CpWeapon>;
  options?: Array<string>;
  weapon?: CpWeapon;
  notes?: string;
}
