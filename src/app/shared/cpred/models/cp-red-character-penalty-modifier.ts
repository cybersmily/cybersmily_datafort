import { CpRedPenaltyModifier } from './cp-red-penalty-modifier';
import { CP_RED_PENATLY_TYPE } from './enums';

export class CpRedCharacterPenaltyModifier implements CpRedPenaltyModifier {
  type: CP_RED_PENATLY_TYPE;
  attribute: string;
  modifier: number;

  constructor(param?: any) {
    this.type = param?.type ?? null;
    this.attribute = param?.attribute ?? '';
    this.modifier = param?.modifier ?? 0;
  }
}
