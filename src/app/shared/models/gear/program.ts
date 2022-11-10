import { Gear } from '../../cp2020/cp2020-gear/models/gear';

export interface Program extends Gear {
  mu: string;
  options: string[];
  str: string;
  icon: string;
}
