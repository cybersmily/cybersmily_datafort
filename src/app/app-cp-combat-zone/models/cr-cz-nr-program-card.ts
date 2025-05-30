import { crCzActionColor } from "./cr-cz-types";

export interface iCrCzNrProgramCard {
  name: string;
  factions: string;
  action: crCzActionColor;
  inspiredRefresh: boolean;
  vulnerable: boolean;
  cred: number;
  eb: number;
  rarity: number;

  flavor: string;
  load: string;
  effect: string;
  refresh: string;
}
