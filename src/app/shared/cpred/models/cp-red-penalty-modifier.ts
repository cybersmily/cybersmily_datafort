import { CP_RED_PENATLY_TYPE } from './enums';
export interface CpRedPenaltyModifier {
  type: CP_RED_PENATLY_TYPE;
  attribute: string;
  modifier: number;
}
