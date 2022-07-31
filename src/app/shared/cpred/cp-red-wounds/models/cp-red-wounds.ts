import { CP_RED_WOUND_LEVELS } from './enums';
import { CpRedCharacterCriticalInjury } from './cp-red-character-critical-injury';
import { CpRedCharacterAddiction } from './cp-red-character-addiction';

export interface CpRedWounds {
  hitPoints: {
    curr: number;
    base: number;
  };
  deathSave: number;
  seriouslyWound: number;
  addictions: Array<CpRedCharacterAddiction>;
  criticalInjuries: Array<CpRedCharacterCriticalInjury>;
  woundLevel: CP_RED_WOUND_LEVELS;
  isDead: boolean;
}
