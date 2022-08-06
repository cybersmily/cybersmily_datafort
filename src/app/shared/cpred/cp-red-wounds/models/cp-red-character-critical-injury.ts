import { CpRedCharacterPenaltyModifier } from '../../models/cp-red-character-penalty-modifier';

export class CpRedCharacterCriticalInjury {
  name: string;
  effect: string;
  fix: string;
  treatment: string;
  penalties: Array<CpRedCharacterPenaltyModifier>;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.effect = param?.effect ?? '';
    this.fix = param?.fix ?? '';
    this.treatment = param?.treatment ?? '';
    this.penalties =
      param?.penalties?.map((p) => ({ ...p })) ??
      new Array<CpRedCharacterPenaltyModifier>();
  }
}
