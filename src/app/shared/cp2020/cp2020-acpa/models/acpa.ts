import { ACPALocations } from './acpa-locations';
import { ACPAArmor } from './acpa-armor';
import { ACPAChassis } from './acpa-chassis';
import { ACPAComponent } from '.';
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
  hasStealth: boolean;
  trooperSize: number;
  toughnessMod: number;
  realityInterface: ACPAComponent;
  controlSystem: ACPAComponent;
  notes: string;
  equipment: Array<any>;
  locations: ACPALocations;
}
