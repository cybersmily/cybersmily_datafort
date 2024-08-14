import { crCzFaction, crCzObjectiveRewardType } from "./cr-cz-types";

export interface iCrCzObjectiveCard {
  name: string;
  faction: crCzFaction;
  objective: string;
  reward: string;
  rewardType: crCzObjectiveRewardType;
  streetcred: number;
}
