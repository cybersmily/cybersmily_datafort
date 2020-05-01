import { VehicleMinMax } from './vehicle-min-max';

export class VehicleSdp implements VehicleMinMax {
  min: number;
  max: number;
  perSpace: number;
  eb: number;
  constructor() {
    this.min = 0;
    this.max = 0;
    this.perSpace = 0;
    this.eb = 0;
  }
}
