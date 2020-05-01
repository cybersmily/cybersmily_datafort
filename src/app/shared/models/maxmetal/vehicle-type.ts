import { VehicleMass } from './vehicle-mass';
import { VehicleSdp } from './vehicle-sdp';
import { VehicleMinMax } from './vehicle-min-max';

export class VehicleType {
  name: string;
  sdp: VehicleSdp;
  spaces: VehicleMinMax;
  speed: number;
  range: number;
  mass: VehicleMass;
  acc: number;
  dec: number;
  offroad: boolean;
  massRating: number;
  cargoCapacity: number;
  capacityIncrease: number;
  isAirVehicle: boolean;
  constructor() {
    this.name = '';
    this.sdp = new VehicleSdp();
    this.spaces = { min: 0, max: 0 };
    this.speed = 0;
    this.range = 0;
    this.mass = { wt: 0, unit: '', sdp: 0};
    this.acc = 0;
    this.dec = 0;
    this.offroad = false;
    this.massRating = 0;
    this.cargoCapacity = 0;
    this.capacityIncrease = 0;
    this.isAirVehicle = false;
  }
}
