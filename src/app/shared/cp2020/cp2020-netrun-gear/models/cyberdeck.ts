import { CyberdeckChassis } from './cyberdeck-chassis';
import { CyberdeckOption } from './cyberdeck-option';
import { Program } from './program';

export interface Cyberdeck {
  name: string;
  type: CyberdeckChassis;
  dataWall: number;
  speed: number;
  totalMU: number;
  doubleMu: boolean;
  options: Array<CyberdeckOption>;
  programs?: Array<Program>;
  description: string;
}
