import { Cp2020VehiclesModule } from './../cp2020-vehicles.module';
import { VehicleBase } from './vehicle-base';
import { VehicleWeapon, Cp2020VehicleWeapon } from './../../cp2020weapons/models/vehicle-weapon';
import { VehicleOption } from './vehicle-option';


export class Cp2020Vehicle implements VehicleBase {
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
  weapons: Array<Cp2020VehicleWeapon>;
  description: string;
  offRoad: boolean;
  cost: number;
  options: Array<VehicleOption>;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.type = param?.type ?? '';
    this.sdp = param?.sdp ?? 0;
    this.sp = param?.sp ?? 0;
    this.speed = param?.speed ?? 0;
    this.accelerate = param?.accelerate ?? 0;
    this.decelerate = param?.decelerate ?? 0;
    this.range = param?.range ?? 0;
    this.crew = param?.crew ?? 0;
    this.passengers = param?.passengers ?? 0;
    this.cargo = param?.cargo ?? '';
    this.manuever = param?.manuever ?? 0;
    this.weapons = new Array<VehicleWeapon>();
    if(param && Array.isArray(param.weapons)) {
      param.weapons.forEach(wpn => {
        this.weapons.push(wpn);
      });
    }
    this.description = param?.description ?? '';
    this.offRoad = param?.offRoad ?? false;
    this.cost = param?.cost ?? 0;
    this.options = Array<VehicleOption>();
    if(param && Array.isArray(param.options)) {
      param.options.forEach( opt => {
        this.options.push(opt);
      });
    }

  }

}
