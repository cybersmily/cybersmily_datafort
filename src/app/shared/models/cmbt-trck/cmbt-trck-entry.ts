import { ArmorPiece } from './../../cp2020/cp2020-armor/models';
import { CpWeapon } from '../../cp2020/cp2020weapons/models';

export interface CmbtTrckEntry {
  name: string;
  armor?: ArmorPiece;
  ev?: number;
  choices?: Array<CpWeapon>;
  options?: Array<string>;
  weapon?: CpWeapon;
  notes?: string;
}
