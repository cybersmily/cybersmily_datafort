import { ArmorLocations } from './armor-locations';
import { PieceOfClothing } from './piece-of-clothing';
import { ArmorOption } from './armor-option';

export interface ArmorPiece {
  name: string;
  clothes: PieceOfClothing;
  style: ArmorOption; // the style of it, like EdgeRunner or High Fashion
  quality: ArmorOption; // the quality of the clothes, Very Good, Superchic, Average etc.
  options: ArmorOption[];

  baseSP: number;
  locations: ArmorLocations;

  ev: number;
  order: number;
  isHard: boolean;
  isActive?: boolean;
  isSkinWeave?: boolean;
  isLeather?: boolean;

  cost: number;
}
