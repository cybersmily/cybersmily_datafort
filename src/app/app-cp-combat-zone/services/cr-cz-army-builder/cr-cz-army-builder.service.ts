import { CrCzUnit, iCrCzUnitCardData, iCrCzUnitCard } from './../../models/cr-cz-unit-card';
import { Injectable } from '@angular/core';
import { CrCzSquad, iCrCzSquad } from '../../models/cr-cz-squad';
import { BehaviorSubject, Observable, take, map, of } from 'rxjs';
import { iCrCzGearItemCard } from '../../models/cr-cz-gear-item-card';
import { iCrCzNrProgramCard } from '../../models/cr-cz-nr-program-card';
import { iCrCzLootCard } from '../../models/cr-cz-loot-card';
import { LocalStorageManagerService } from './../../../shared/services/local-storage-manager/local-storage-manager.service';
import { CRCZ_LOCAL_STORAGE_KEY } from '../../models/cr-cz-types';
import { iCrCzObjectiveCard } from '../../models/cr-cz-objective-card';

@Injectable({
  providedIn: 'root'
})
export class CrCzArmyBuilderService {
  private _army: BehaviorSubject<Array<iCrCzSquad>> = new BehaviorSubject<Array<iCrCzSquad>>([]);
  army:Observable<Array<iCrCzSquad>> = this._army.asObservable();

  constructor(private localStorage: LocalStorageManagerService) {
    if(this.localStorage.hasKey(CRCZ_LOCAL_STORAGE_KEY)) {
      let army = this.localStorage.retrive<Array<iCrCzSquad>>(CRCZ_LOCAL_STORAGE_KEY);

      this._army.next(army.map(squad => new CrCzSquad(squad)));
    }
   }

   private saveArmy(army: Array<iCrCzSquad>): void {
    this._army.next(army.map(squad => new CrCzSquad(squad)));
    this.localStorage.store<Array<iCrCzSquad>>(CRCZ_LOCAL_STORAGE_KEY,army);
   }

   importArmy(army: Array<iCrCzSquad>): Observable<boolean> {
    this.saveArmy(army);
    return of(army.length === this._army.getValue().length);
   }

   getSquad(squadIndex: number): Observable<iCrCzSquad> {
    return this.army.pipe(take(1),map(army => army[squadIndex]));
   }

  addSquad(squad: iCrCzSquad): void {
    let army = [...this._army.getValue()];
    army.push(new CrCzSquad(squad));
    this.saveArmy(army);
  }

  removeSquad(squadIndex: number): void {
    let army = [...this._army.getValue()];
    army.splice(squadIndex, 1);
    this.saveArmy(army);
  }

  addObjective(squadIndex: number, objective: iCrCzObjectiveCard): void {
    let army = [...this._army.getValue()];
    army[squadIndex].objectives.push(objective);
    this.saveArmy(army);

  }

  removeObjective(squadIndex: number): void {
    let army = [...this._army.getValue()];
    army[squadIndex].objectives.splice(squadIndex, 1);
    this.saveArmy(army);

  }

  inspireTeam(squadIndex: number): void {
    let army = [...this._army.getValue()];
    army[squadIndex].units = army[squadIndex].units.map(unit => {
      unit.actionTokens = unit.actionTokens.map( token => {
        token.isUsed = false;
        return token;
      })
      return unit;
    });
    this.saveArmy(army);
  }

  updateSquadLuck(squadIndex: number, amount: number): void {
    let army = [...this._army.getValue()];
    army[squadIndex].luck += amount;
    this.saveArmy(army);
  }

  updateSquadVeteranCost(squadIndex: number): void {
    let army = [...this._army.getValue()];
    army[squadIndex].payVeterans = !army[squadIndex].payVeterans;
    this.saveArmy(army);
  }


  getUnit(squadIndex: number, unitIndex: number): Observable<iCrCzUnitCard>{
    return this.army.pipe(take(1),map(army => army[squadIndex].units[unitIndex]));
  }

  addUnit(armyIndex: number, unit: iCrCzUnitCardData, rank: number):void  {
    let army = [...this._army.getValue()];
    let newUnit: CrCzUnit = new CrCzUnit();
    newUnit.name = unit.name;
    newUnit.ebCost = unit.ebCost;
    newUnit.faction = unit.faction;
    newUnit.streetcred = rank;
    newUnit.isLeader = unit.isLeader;
    newUnit.isMerc = unit.isMerc;
    newUnit.isGonk = unit.isGonk;
    newUnit.keywords = [...unit.keywords];

    newUnit.armor = unit.ranks[rank].armor;
    newUnit.melee = unit.ranks[rank].melee;
    newUnit.ranged = unit.ranks[rank].ranged;
    newUnit.move = unit.ranks[rank].move;
    newUnit.tech = unit.ranks[rank].tech;
    newUnit.med = unit.ranks[rank].med;
    newUnit.influence = unit.ranks[rank].influence;
    newUnit.actions = unit.ranks[rank].actions;
    newUnit.unitGear = unit.ranks[rank].unitGear;
    newUnit.specialRules = unit.ranks[rank].specialRules;
    newUnit.actionTokens = unit.ranks[rank].actions.map(action => {
      return { type: action, isUsed: false, isRed: false};
    });

    newUnit.gearCards = new Array<iCrCzGearItemCard>();
    newUnit.programs = new Array<iCrCzNrProgramCard>();
    newUnit.loot = new Array<iCrCzLootCard>();

    army[armyIndex].units.push(newUnit);
    this.saveArmy(army);
  }

  hasUnit(squadIndex: number, unitName: string, unitStreetcred: number ): boolean {
    let army = this._army.getValue();
    return army[squadIndex]?.units.some((unit: CrCzUnit) => (unit?.name === unitName && unit?.streetcred == unitStreetcred) );
  }

  countOfUnit(squadIndex: number, unitName: string, unitStreetcred: number): number {
    let army = this._army.getValue();
    return army[squadIndex]?.units.filter((unit: CrCzUnit) => (unit?.name === unitName && unit?.streetcred == unitStreetcred) ).length;
  }

  getSquadGearList(squadIndex: number): Observable<Array<string>> {
    return this.army.pipe(
      map( army => {
        let list = new Array<string>();
        army[squadIndex].units.forEach(
         unit => {
          const unitGear = unit.gearCards.map(gear => gear.name);
          if(unitGear.length > 0){
            list.push(...unitGear);
          }
         }
        );
        return list;
    })
    );
  }

  removeUnit(armyIndex: number, unitIndex: number):void {
    let army = this._army.getValue();
    army[armyIndex].units.splice(unitIndex, 1);
    this.saveArmy(army);
  }

  updateUnit(squadIndex: number, unitIndex: number, unit: CrCzUnit): void {
    let army = this._army.getValue();
    army[squadIndex].units[unitIndex] = new CrCzUnit(unit);
    this.saveArmy(army);
  }
}