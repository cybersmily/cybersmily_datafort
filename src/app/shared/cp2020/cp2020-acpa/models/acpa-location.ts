import { ACPAWeapon } from './acpa-weapon';
import { ACPAComponent } from './acpa-component';
export interface ACPALocation {
  name: string;
  sp: number;
  currSP?: number;
  sdp: number;
  currSDP?: number;
  internalSpaces: number;
  externalSpaces: number;
  internalSpacesUsed: number;
  externalSpacesUsed: number;
  internalComponents: Array<ACPAComponent|ACPAWeapon>;
  externalComponents: Array<ACPAComponent|ACPAWeapon>;
}
