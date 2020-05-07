import { VehicleMinMax } from './vehicle-min-max';

export interface VehicleSdp extends VehicleMinMax {
  min: number;
  max: number;
  perSpace: number;
  eb: number;
}
