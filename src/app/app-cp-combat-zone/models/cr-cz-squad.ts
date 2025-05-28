import { CreateCombatZoneObjective, iCrCzObjectiveCard } from "./cr-cz-objective-card";
import { iCrCzUnitCard, CrCzUnit, CreateCombatZoneUnitFromObject } from "./cr-cz-unit-card";

export interface iCrCzSquad {
  name: string;
  units: Array<iCrCzUnitCard>;
  faction: string;
  luck: number;
  objectives: Array<iCrCzObjectiveCard>;
  scenarioObjectives: Array<iCrCzObjectiveCard>;
  notes?: string;

  totalCost: number;
  payVeterans: boolean;
  totalInfluence: number;
  totalStreetcred: number;
  totalGonks: number;
  totalMercs?: number;
}


export class CrCzSquad implements iCrCzSquad {
  name: string;
  units: Array<iCrCzUnitCard>;
  luck: number;
  faction: string;
  objectives: Array<iCrCzObjectiveCard>;
  scenarioObjectives: Array<iCrCzObjectiveCard>;
  payVeterans: boolean;
  notes?: string;

   get totalCost(): number {
    if(this.units.length < 1) {
      return 0;
    }
    let cost = this.units.reduce((a,b) => a + b.totalCost, 0);
    if(this.payVeterans) {
      cost += this.units.reduce((a,b) => a + (b.cred *  5) , 0);
    }
    return cost;
   }
  get totalInfluence(): number{
    if(this.units.length < 1) {
      return 0;
    }
    return this.units.reduce((a,b) => a + b.influence, 0);
  }
  get totalStreetcred(): number {
    if(this.units.length < 1) {
      return 0;
    }
    const unitCred = this.units.reduce((a,b) => a + b.cred, 0);
    const objectiveCred = this.objectives.reduce((a,b) => a + b.cred,0);

    return unitCred + objectiveCred ;
  }

  get totalGonks(): number {
    if(this.units.length < 1) {
      return 0;
    }
    return this.units.filter(unit => unit.isGonk).length;
  }

  get totalMercs(): number {
    if(this.units.length < 1) {
      return 0;
    }
    return this.units.filter(unit => (!unit.keywords.includes(this.faction) && unit.keywords.includes('merc'))).length;
  }


}

export function CreateCombatZoneTeam(param?: iCrCzSquad): CrCzSquad {
  const team = new CrCzSquad();
  team.name = param?.name || "new squad";
  team.units = param?.units?.map(unit => CreateCombatZoneUnitFromObject(unit)) || new Array<iCrCzUnitCard>();
  team.faction = param?.faction || '';
  team.luck = param?.luck || 3;
  team.payVeterans = param?.payVeterans || false;
  team.objectives = param?.objectives?.map(obj => CreateCombatZoneObjective(obj)) || new Array<iCrCzObjectiveCard>();
  team.scenarioObjectives = param?.scenarioObjectives?.map(obj => CreateCombatZoneObjective(obj)) || new Array<iCrCzObjectiveCard>();
  team.notes = param?.notes || '';
  return team;
}

