import { Cp2020AcpaArmor } from './cp2020-acpa-armor';
import { ACPAArmor } from './acpa-armor';
import { Cp2020ACPASettings } from './../enums/cp2020-acpa-settings';
import { Cp2020ACPAChassis } from './cp2020-acpa-chassis';
import { ACPAChassis } from './acpa-chassis';
import { ACPA } from './acpa';
import { Cp2020ACPALocations } from './cp2020-acpa-locations';
export class Cp2020ACPA implements ACPA {
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
  locations: Cp2020ACPALocations;

  constructor(param?: ACPA) {
    this.name = param?.name ?? '';
    this.manufacturer = param?.manufacturer ?? '';
    this.totalWeight = param?.totalWeight ?? 0;
    this.chassis = new Cp2020ACPAChassis(param?.chassis);
    this.armor = new Cp2020AcpaArmor(param?.armor);
    this.sib = param?.sib ?? 0;
    this.dfb = param?.dfb ?? 0;
    this.punch = param?.punch ?? '';
    this.kick = param?.kick ?? '';
    this.crush = param?.crush ?? '';
    this.run = param?.run ?? 0;
    this.leap = param?.leap ?? 0;
    this.jump = param?.jump ?? 0;
    this.totalCost = param?.totalCost ?? 0;
    this.trooperSize = param?.trooperSize ?? Cp2020ACPASettings.TROOPSIZE_DEFAULT.valueOf();
    this.toughnessMod = param?.toughnessMod ?? 0;
    this.notes = param?.notes ?? '';
    this.equipment = param?.equipment?.map(equip => equip)?? new Array<any>();
    this.locations = new Cp2020ACPALocations(param?.locations);

  }
}
