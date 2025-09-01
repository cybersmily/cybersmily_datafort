import { iCrCzObjectiveCard } from "../models/cr-cz-objective-card";

export function CreateCombatZoneObjective(param?: any): iCrCzObjectiveCard {
  const objective: iCrCzObjectiveCard = {
    name: param?.name || '',
    faction: param?.faction || '',
    objective: param?.objective || '',
    reward: param?.reward || '',
    rewardType: param?.reward || '',
    cred: param?.cred || param?.streetcred || 0
  };
  return objective;
}
