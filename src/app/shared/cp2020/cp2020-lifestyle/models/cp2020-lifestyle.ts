import { Cp2020Food } from './cp2020-food';
import { Cp2020Utility } from './cp2020-utility';
import { Cp2020Housing } from './cp2020-housing';
import { Cp2020Identity } from './cp2020-identity';
import { Cp2020Credchip } from './cp2020-credchip';

export interface Cp2020Lifestyle {
  cash: number;
  credit: Array<Cp2020Credchip>;
  salary: number;
  housing: Array<Cp2020Housing>;
  utilities: Array<Cp2020Utility>;
  food: Array<Cp2020Food>;
  identities: Array<Cp2020Identity>;
}
