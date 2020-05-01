import { CpPlayerWeapon } from './cp-player-weapon';
export class CpPlayerWeaponList {
  items: Array<CpPlayerWeapon>;

  constructor(length: number) {
    this.items = Array.from({length: length}, () => (new CpPlayerWeapon()));
  }
}
