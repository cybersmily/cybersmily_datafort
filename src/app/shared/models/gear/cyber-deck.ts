import { Gear } from '../../cp2020/cp2020-gear/models/gear';

export interface CyberDeck extends Gear {
  speed: string;
  dataWall: string;
  options: string;
  mu: string;
}
