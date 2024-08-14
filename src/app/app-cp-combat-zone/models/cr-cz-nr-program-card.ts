import { crCzActionColor, crCzFaction } from "./cr-cz-types";

export interface iCrCzNrProgramCard {
  name: string;
  factions: crCzFaction;
  action: crCzActionColor;
  inspiredRefresh: boolean;
  vulnerable: boolean;
  streetcred: number;
  ebCost: number;
  rarity: number;

  flavor: string;
  load: string;
  effect: string;
  refresh: string;
}
