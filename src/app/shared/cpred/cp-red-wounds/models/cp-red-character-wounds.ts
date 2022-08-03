import { CpRedCharacterDeathSave } from './cp-red-character-death-save';
import { CP_RED_WOUND_LEVELS } from './enums';
import { CpRedWounds } from './cp-red-wounds';
import { CpRedCharacterCriticalInjury } from './cp-red-character-critical-injury';
import { CpRedCharacterAddiction } from './cp-red-character-addiction';

export class CpRedCharacterWounds implements CpRedWounds {
  hitPoints: {
    curr: number;
    base: number;
  };
  deathSave: CpRedCharacterDeathSave;
  seriouslyWound: number;
  addictions: Array<CpRedCharacterAddiction>;
  criticalInjuries: Array<CpRedCharacterCriticalInjury>;
  woundLevel: CP_RED_WOUND_LEVELS;
  isDead: boolean;

  constructor(param?: any) {
    this.hitPoints = {
      curr: param?.hitPoints?.curr ?? 0,
      base: param?.hitPoints?.base ?? 0,
    };
    this.deathSave = new CpRedCharacterDeathSave(param?.deathSave);
    this.seriouslyWound = param?.seriouslyWound ?? 0;
    this.addictions =
      param?.addictions?.map((add) => ({ ...add })) ??
      new Array<CpRedCharacterAddiction>();
    this.criticalInjuries =
      param?.criticalInjuries?.map((crit) => ({ ...crit })) ??
      new Array<CpRedCharacterCriticalInjury>();
    this.woundLevel = param?.woundLevel ?? CP_RED_WOUND_LEVELS.NONE;
    this.isDead = param?.isDead ?? false;
  }
}
