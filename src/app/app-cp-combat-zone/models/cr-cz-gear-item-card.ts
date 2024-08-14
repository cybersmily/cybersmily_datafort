import {  crCzActionType, crCzFaction } from "./cr-cz-types";

export interface iCrCzGearItemCard {
  name: string;
  faction: crCzFaction;
  streetcred: number;
  ebCost: number;
  rarity: number;
  action: crCzActionType;
  keywords: Array<string>;
  attributes: Array<string>;
}
