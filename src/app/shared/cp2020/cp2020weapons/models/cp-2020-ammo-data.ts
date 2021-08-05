import { Cp2020AmmoTypes } from './cp-2020-ammo-types';
import { Cp2020Ammo } from "./cp-2020-ammo";

export interface Cp2020AmmoData {
  ammo: Array<Cp2020Ammo>;
  types: Array<Cp2020AmmoTypes>;
}
