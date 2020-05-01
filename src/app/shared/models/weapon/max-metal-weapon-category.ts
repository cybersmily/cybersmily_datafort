import { MaxMetalWeapon } from '.';
export interface MaxMetalWeaponCategory {
  key: string;
  value: {
    name: string;
    id: string;
    items: MaxMetalWeapon[];
  }
}
