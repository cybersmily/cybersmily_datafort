import { CpRedDeathSave } from './cp-red-death-save';
import { CpRedCharacterDeathSave } from './cp-red-character-death-save';
import { CP_RED_WOUND_LEVELS } from './enums';
import { CpRedCharacterCriticalInjury } from './cp-red-character-critical-injury';
import { CpRedCharacterAddiction } from './cp-red-character-addiction';

export interface CpRedWounds {
  hitPoints: {
    curr: number;
    base: number;
  };
  deathSave: CpRedDeathSave;
  seriouslyWound: number;
  addictions: Array<CpRedCharacterAddiction>;
  criticalInjuries: Array<CpRedCharacterCriticalInjury>;
  woundLevel: CP_RED_WOUND_LEVELS;
  isDead: boolean;
}
