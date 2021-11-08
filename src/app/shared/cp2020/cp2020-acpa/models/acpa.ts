import { ACPALocations } from './acpa-locations';
import { ACPAArmor } from './acpa-armor';
import { ACPAChassis } from './acpa-chassis';
export interface ACPA {
  name: string;
  manufacturer: string;
  totalWeight: number;
  chassis: ACPAChassis;
  armor: ACPAArmor;
  sib: number;
  dfb: number;
  punch: string;
  kick: string;
  crush: string;
  run: number;
  leap: number;
  jump: number;
  totalCost: number;
  trooperSize: number;
  toughnessMod: number;
  notes: string;
  equipment: Array<any>;
  locations: ACPALocations;
}
