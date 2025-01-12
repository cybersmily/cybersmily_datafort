import {  crCzActionType, crCzFaction } from "./cr-cz-types";

export interface iCrCzGearItemCard {
  name: string;
  faction: crCzFaction;
  cred: number;
  eb: number;
  rarity: number;
  action: crCzActionType;
  ranges: string;
  damage: boolean;
  armor: number;
  keywords: Array<string>;
  attributes: Array<string>;
}
