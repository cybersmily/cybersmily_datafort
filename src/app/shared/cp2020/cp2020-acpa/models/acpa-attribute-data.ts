import { ACPAArmor } from './acpa-armor';
import { ACPAChassis } from './acpa-chassis';
import { ACPAComponent } from './acpa-component';
import { ACPAWeapon } from './acpa-weapon';
export interface AcpaAttributeData {
  chassis: Array<ACPAChassis>;
  armor: Array<ACPAArmor>;
  components: Array<ACPAComponent>;
  weapons: Array<ACPAWeapon>;
}
