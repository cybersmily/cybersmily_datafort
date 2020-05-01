import { Ammo } from './ammo';
export interface MaxMetalAmmo extends Ammo {
  name: string;
  damage: string;
  pen: string;
  burst: string;
  costPerLoad: number;
  spacePerLoad: number;
}
