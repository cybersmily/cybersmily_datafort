import { CpWeapon } from './cp-weapon';

export interface WeaponGroup {
  name: string;
  id: string;
  guns: CpWeapon[];
}
