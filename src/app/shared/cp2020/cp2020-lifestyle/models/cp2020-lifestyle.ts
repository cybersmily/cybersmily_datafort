import { Cp2020Food } from './cp2020-food';
import { Cp2020Services } from './cp2020-services';
import { CpHousing } from './cp-housing';
import { Cp2020Identity } from './cp2020-identity';
import { Cp2020Credchip } from './cp2020-credchip';

export interface Cp2020Lifestyle {
  cash: number;
  credchips: Array<Cp2020Credchip>;
  debt: number;
  salary: number;
  housing: Array<CpHousing>;
  services: Array<Cp2020Services>;
  food: Array<Cp2020Food>;
  identities: Array<Cp2020Identity>;
}
