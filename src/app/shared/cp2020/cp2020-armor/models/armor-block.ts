import { Cp2020SDPBlock } from './cp2020-sdp-block';
import { Cp2020ArmorPiece } from './cp2020-armor-piece';

export interface ArmorBlock {
  armorPieces: Array<Cp2020ArmorPiece>;
  sdp: Cp2020SDPBlock;
  isLayerEVCalcEnabled?: boolean;
}
