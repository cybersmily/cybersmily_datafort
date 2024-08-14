import { iCrCzObjectiveCard } from "./cr-cz-objective-card";
import { iCrCzUnitCard, CrCzUnit } from "./cr-cz-unit-card";

export interface iCrCzSquad {
  name: string;
  units: Array<iCrCzUnitCard>;
  faction: string;
  luck: number;
  objectives: Array<iCrCzObjectiveCard>;

  totalCost: number;
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

   get totalCost(): number {
    if(this.units.length < 1) {
      return 0;
    }
    return this.units.reduce((a,b) => a + b.totalCost, 0);
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
    return this.units.reduce((a,b) => a + b.streetcred, 0) + this.objectives.reduce((a,b) => a + b.streetcred,0);
  }

  get totalGonks(): number {
    if(this.units.length < 1) {
      return 0;
    }
    return this.units.filter(unit => unit.isGonk).length;
  }

  constructor(param?: iCrCzSquad) {
    this.name = param?.name || "new squad";
    this.units = param?.units.map(unit => new CrCzUnit(unit)) || new Array<iCrCzUnitCard>();
    this.faction = param?.faction || 'arasaka';
    this.luck = param?.luck || 3;
    this.objectives = param?.objectives || new Array<iCrCzObjectiveCard>();
  }

}

