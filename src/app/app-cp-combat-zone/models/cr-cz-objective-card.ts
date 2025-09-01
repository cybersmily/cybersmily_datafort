import { crCzObjectiveRewardType } from "./cr-cz-types";

export interface iCrCzObjectiveCard {
  name: string;
  faction: string;
  objective: string;
  reward: string;
  rewardType: crCzObjectiveRewardType;
  cred?: number;
}
