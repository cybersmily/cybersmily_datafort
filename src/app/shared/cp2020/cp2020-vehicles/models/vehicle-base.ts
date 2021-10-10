import { VehicleWeapon } from './../../cp2020weapons/models/vehicle-weapon';
import { VehicleOption } from './vehicle-option';

export interface VehicleBase {
  name: string;
  type: string;
  sdp: number;
  sp: number;
  speed: number;
  accelerate: number;
  decelerate: number;
  range: number;
  crew: number;
  passengers: number;
  cargo: string;
  manuever: number;
  weapons: Array<VehicleWeapon>;
  description: string;
  offRoad: boolean;
  cost: number;
  options: Array<VehicleOption>;
}
