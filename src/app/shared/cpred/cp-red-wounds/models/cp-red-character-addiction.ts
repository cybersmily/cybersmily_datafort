import { CpRedCharacterPenaltyModifier } from '../../models/cp-red-character-penalty-modifier';
export class CpRedCharacterAddiction {
  name: string;
  effect: string;
  dv: number;
  penalties: Array<CpRedCharacterPenaltyModifier>;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.effect = param?.effect ?? '';
    this.penalties =
      param?.penalties?.map((p) => ({ ...p })) ??
      new Array<CpRedCharacterPenaltyModifier>();
  }
}
