import { Cp2020ACPAWeapon } from './cp2020-acpa-weapon';
import { Cp2020ACPAComponent } from './cp2020-acpa-component';
import { ACPALocation } from './acpa-location';
export class Cp2020ACPALocation implements ACPALocation{
  name: string;
  sp: number;
  sdp: number;
  internalSpaces: number;
  externalSpaces: number;
  internalComponents: Array<Cp2020ACPAComponent|Cp2020ACPAWeapon>;
  externalComponents: Array<Cp2020ACPAComponent|Cp2020ACPAWeapon>;
  internalSpacesUsed: number;
  externalSpacesUsed: number;

  constructor(param?: ACPALocation) {
    this.name = param?.name ?? '';
    this.sp = param?.sp ?? 0;
    this.sdp = param?.sdp ?? 0;
    this.internalSpaces = param?.internalSpaces ?? 0;
    this.externalSpaces = param?.externalSpaces ?? 0;
    this.internalSpacesUsed = param?.internalSpacesUsed ?? 0;
    this.externalSpacesUsed = param?.externalSpacesUsed ?? 0;
    this.internalComponents = (param) ? [...param.internalComponents] : new Array<Cp2020ACPAComponent|Cp2020ACPAWeapon>();
    this.externalComponents = (param) ? [...param.externalComponents] : new Array<Cp2020ACPAComponent|Cp2020ACPAWeapon>();
  }
}
