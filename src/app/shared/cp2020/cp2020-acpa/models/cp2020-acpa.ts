import { Cp2020ACPAComponent } from './cp2020-acpa-component';
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
  weightCarried: number;
  totalCost: number;
  weightModifier: number;
  costModifier: number;
  chassis: ACPAChassis;
  armor: ACPAArmor;
  isWad: boolean;
  ma: number;
  sib: number;
  dfb: number;
  punch: string;
  kick: string;
  crush: string;
  run: number;
  leap: number;
  jump: number;
  trooperSize: number;
  toughnessMod: number;
  hasStealth: boolean;
  notes: string;
  realityInterface: Cp2020ACPAComponent;
  controlSystem: Cp2020ACPAComponent;
  equipment: Array<any>;
  locations: Cp2020ACPALocations;

  constructor(param?: ACPA) {
    this.name = param?.name ?? '';
    this.manufacturer = param?.manufacturer ?? '';
    this.totalWeight = param?.totalWeight ?? 0;
    this.weightCarried = param?.weightCarried ?? 0;
    this.weightModifier = param?.weightModifier ?? 1;
    this.costModifier = param?.costModifier ?? 1;
    this.totalCost = param?.totalCost ?? 0;
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
    this.isWad = param?.isWad ?? false;
    this.ma = param?.ma ?? 5;

    this.trooperSize =
      param?.trooperSize ?? Cp2020ACPASettings.TROOPSIZE_DEFAULT.valueOf();
    this.totalWeight = param?.totalWeight ?? this.trooperSize;
    this.toughnessMod = param?.toughnessMod ?? 0;
    this.realityInterface = new Cp2020ACPAComponent(param?.realityInterface);
    this.controlSystem = new Cp2020ACPAComponent(param?.controlSystem);
    this.hasStealth = param?.hasStealth ?? false;

    this.notes = param?.notes ?? '';
    this.equipment =
      param?.equipment?.map((equip) => equip) ?? new Array<any>();
    this.locations = new Cp2020ACPALocations(param?.locations);
  }
}
