import { CpWeapon } from './../../shared/models/weapon/cp-weapon';

import {  CmbtTrckOppTempArmor } from './';
export interface CmbtTrckEntry {
  name: string;
  armor?: CmbtTrckOppTempArmor;
  ev?: number;
  choices?: Array<CpWeapon>;
  options?: Array<string>;
  weapon?: CpWeapon;
  notes?: string;
}
