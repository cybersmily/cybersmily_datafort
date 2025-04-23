import { iCrCzObjectiveCard } from "./cr-cz-objective-card";
import { iCrCzUnitCard, CrCzUnit, CreateCombatZoneUnitFromObject } from "./cr-cz-unit-card";

export interface iCrCzSquad {
  name: string;
  units: Array<iCrCzUnitCard>;
  faction: string;
  luck: number;
  objectives: Array<iCrCzObjectiveCard>;
  notes?: string;

  totalCost: number;
  payVeterans: boolean;
  totalInfluence: number;
  totalStreetcred: number;
  totalGonks: number;
}


export class CrCzSquad implements iCrCzSquad {
  name: string;
  units: Array<iCrCzUnitCard>;
  luck: number;
  faction: string;
  objectives: Array<iCrCzObjectiveCard>;
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
    const objectiveCred = this.objectives.reduce((a,b) => a + b.streetcred,0);

    return unitCred + objectiveCred ;
  }

  get totalGonks(): number {
    if(this.units.length < 1) {
      return 0;
    }
    return this.units.filter(unit => unit.isGonk).length;
  }

  constructor(param?: iCrCzSquad) {
    this.name = param?.name || "new squad";
    this.units = param?.units.map(unit => CreateCombatZoneUnitFromObject(unit)) || new Array<iCrCzUnitCard>();
    this.faction = param?.faction || '';
    this.luck = param?.luck || 3;
    this.payVeterans = param?.payVeterans || false;
    this.objectives = param?.objectives || new Array<iCrCzObjectiveCard>();
    this.notes = param?.notes || '';
  }

}

