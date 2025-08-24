import {  crCzActionType } from "./cr-cz-types";

export interface iCrCzGearItemCard {
  name: string;
  faction: string;
  cred: number;
  eb: number;
  rarity: number;
  action: crCzActionType;
  ranges: string;
  damage: boolean;
  armor: number;
  keywords: Array<string>;
  attributes: Array<string>;
  flipped?: boolean;
  release?: Array<string>;
}
