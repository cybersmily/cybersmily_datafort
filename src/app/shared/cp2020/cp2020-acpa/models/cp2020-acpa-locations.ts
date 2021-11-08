import { ACPALocations } from './acpa-locations';
import { Cp2020ACPALocation } from './cp2020-acpa-location';
export class Cp2020ACPALocations implements ACPALocations {
  head: Cp2020ACPALocation;
  torso: Cp2020ACPALocation;
  rarm: Cp2020ACPALocation;
  larm: Cp2020ACPALocation;
  rleg: Cp2020ACPALocation;
  lleg: Cp2020ACPALocation;

  constructor(param?:ACPALocations){
    this.head = param?.head ?? new Cp2020ACPALocation();
    this.torso = param?.torso ?? new  Cp2020ACPALocation();
    this.rarm = param?.rarm ?? new Cp2020ACPALocation();
    this.larm = param?.larm ?? new Cp2020ACPALocation();
    this.rleg = param?.rleg ?? new Cp2020ACPALocation();
    this.lleg = param?.lleg ?? new Cp2020ACPALocation();
  }
}
