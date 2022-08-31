import { ACPALocations } from './acpa-locations';
import { Cp2020ACPALocation } from './cp2020-acpa-location';
export class Cp2020ACPALocations implements ACPALocations {
  head: Cp2020ACPALocation;
  torso: Cp2020ACPALocation;
  arms: Array<Cp2020ACPALocation>;
  legs: Array<Cp2020ACPALocation>;

  constructor(param?: ACPALocations) {
    this.head = new Cp2020ACPALocation(param?.head);
    this.torso = new Cp2020ACPALocation(param?.torso);
    this.arms = param?.arms
      ? [...param?.arms]
      : new Array<Cp2020ACPALocation>(2).fill(new Cp2020ACPALocation());
    this.legs = param?.legs
      ? [...param?.legs]
      : new Array<Cp2020ACPALocation>(2).fill(new Cp2020ACPALocation());

    if (param?.rarm) {
      this.arms[0] = { ...param.rarm };
    }
    if (param?.larm) {
      this.arms[1] = { ...param.larm };
    }
    if (param?.rleg) {
      this.legs[0] = { ...param.rleg };
    }
    if (param?.lleg) {
      this.legs[1] = { ...param.lleg };
    }
  }
}
