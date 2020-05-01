import { Gear } from './gear';

export interface Program extends Gear {
  mu: string;
  options: string[];
  str: string;
  icon: string;
}
