import { CpRedStatSettings } from './cp-red-stat-settings';
import { CP_RED_GENERATE_SYSTEMS } from '../../models/enums';

export class CpRedCharacterStatSettings implements CpRedStatSettings {
  system: CP_RED_GENERATE_SYSTEMS;
  statPoints: number;
  maxStat: number;

  constructor(param?: any) {}
}
