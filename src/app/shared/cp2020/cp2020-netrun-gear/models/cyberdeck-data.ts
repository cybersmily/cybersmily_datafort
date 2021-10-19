import { CyberdeckChassis } from './cyberdeck-chassis';
import { CyberdeckOption } from './cyberdeck-option';

export interface CyberdeckData {
  chassis: Array<CyberdeckChassis>;
  options: Array<CyberdeckOption>;
}
