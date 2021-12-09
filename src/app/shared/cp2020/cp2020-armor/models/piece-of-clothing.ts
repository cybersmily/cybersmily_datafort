import { Cp2020ArmorLocType } from './../enums/cp2020-armor-loc-type';
export interface PieceOfClothing {
  name: string;
  cost: string|number;
  type?: Cp2020ArmorLocType;
  wt: string;
  leather?: string;
  loc: string;
}
