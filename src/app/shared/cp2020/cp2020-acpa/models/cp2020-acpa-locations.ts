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
    this.head =  new Cp2020ACPALocation(param?.head);
    this.torso =  new  Cp2020ACPALocation(param?.torso);
    this.rarm = new Cp2020ACPALocation(param?.rarm);
    this.larm = new Cp2020ACPALocation(param?.larm);
    this.rleg = new Cp2020ACPALocation(param?.rleg);
    this.lleg = new Cp2020ACPALocation(param?.lleg);
  }
}
