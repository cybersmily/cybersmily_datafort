import { CP_RED_GENERATE_SYSTEMS } from '../../models/enums';
export interface CpRedStatSettings {
  system: CP_RED_GENERATE_SYSTEMS;
  statPoints: number;
  maxStat: number;
}
