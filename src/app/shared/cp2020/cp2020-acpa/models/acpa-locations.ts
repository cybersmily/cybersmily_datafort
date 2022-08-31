import { ACPALocation } from './acpa-location';
export interface ACPALocations {
  head: ACPALocation;
  torso: ACPALocation;
  arms: Array<ACPALocation>;
  legs: Array<ACPALocation>;
  rarm?: ACPALocation;
  larm?: ACPALocation;
  rleg?: ACPALocation;
  lleg?: ACPALocation;
}
