import { ArmorBlock } from '../../shared/models/armor/armor-block';
import { CpWeapon } from './../../shared/models/weapon/cp-weapon';

export interface CmbtTrckEntry {
  name: string;
  armor?: ArmorBlock;
  ev?: number;
  choices?: Array<CpWeapon>;
  options?: Array<string>;
  weapon?: CpWeapon;
  notes?: string;
}
