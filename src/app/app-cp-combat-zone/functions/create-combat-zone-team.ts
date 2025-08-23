import { iCrCzObjectiveCard } from "../models/cr-cz-objective-card";
import { CrCzSquad, iCrCzSquad } from "../models/cr-cz-squad";
import { iCrCzCharacterCard } from "../models/cr-cz-character-card";
import { CreateCombatZoneObjective } from "./create-combat-zone-objective";
import { CreateCombatZoneCharacterFromObject } from "./create-combat-zone-character-from-object";


export function CreateCombatZoneTeam(param?: iCrCzSquad): CrCzSquad {
  const team = new CrCzSquad();
  team.name = param?.name || "new squad";
  team.units = param?.units?.map(unit => CreateCombatZoneCharacterFromObject(unit)) || new Array<iCrCzCharacterCard>();
  team.faction = param?.faction || '';
  team.luck = param?.luck || 3;
  team.payVeterans = param?.payVeterans || false;
  team.objectives = param?.objectives?.map(obj => CreateCombatZoneObjective(obj)) || new Array<iCrCzObjectiveCard>();
  team.scenarioObjectives = param?.scenarioObjectives?.map(obj => CreateCombatZoneObjective(obj)) || new Array<iCrCzObjectiveCard>();
  team.notes = param?.notes || '';
  return team;
}
