import {
  CrCzUnit,
  iCrCzUnitCardData,
  iCrCzUnitCard,
  CreateCombatZoneUnitFromObject,
} from './../../models/cr-cz-unit-card';
import { Injectable } from '@angular/core';
import { CrCzSquad, CreateCombatZoneTeam, iCrCzSquad } from '../../models/cr-cz-squad';
import { BehaviorSubject, Observable, take, map, of } from 'rxjs';
import { iCrCzGearItemCard } from '../../models/cr-cz-gear-item-card';
import { iCrCzNrProgramCard } from '../../models/cr-cz-nr-program-card';
import { iCrCzLootCard } from '../../models/cr-cz-loot-card';
import { LocalStorageManagerService } from './../../../shared/services/local-storage-manager/local-storage-manager.service';
import { CRCZ_LOCAL_STORAGE_KEY } from '../../models/cr-cz-types';
import { iCrCzObjectiveCard } from '../../models/cr-cz-objective-card';

@Injectable({
  providedIn: 'root',
})
export class CrCzArmyBuilderService {
  private _army: BehaviorSubject<Array<iCrCzSquad>> = new BehaviorSubject<
    Array<iCrCzSquad>
  >([]);
  army: Observable<Array<iCrCzSquad>> = this._army.asObservable();

  constructor(private localStorage: LocalStorageManagerService) {
    if (this.localStorage.hasKey(CRCZ_LOCAL_STORAGE_KEY)) {
      let army = this.localStorage.retrive<Array<iCrCzSquad>>(
        CRCZ_LOCAL_STORAGE_KEY
      );
      this._army.next(army.map((squad) => CreateCombatZoneTeam(squad)));
    }
  }

  private saveArmy(army: Array<iCrCzSquad>): void {
    this._army.next(army.map((squad) => CreateCombatZoneTeam(squad)));
    this.localStorage.store<Array<iCrCzSquad>>(CRCZ_LOCAL_STORAGE_KEY, army);
  }

  importArmy(army: Array<iCrCzSquad>): Observable<boolean> {
    this.saveArmy(army);
    return of(army.length === this._army.getValue().length);
  }

  getSquad(squadIndex: number): Observable<iCrCzSquad> {
    return this.army.pipe(
      take(1),
      map((army) => army[squadIndex])
    );
  }

  addSquad(squad: iCrCzSquad): void {
    let army = [...this._army.getValue()];
    army.push( CreateCombatZoneTeam(squad));
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

  removeObjective(squadIndex: number, objective: iCrCzObjectiveCard): void {
    let army = [...this._army.getValue()];
    let objectiveIndex = army[squadIndex].objectives.findIndex(obj => obj.name === objective.name);
    army[squadIndex].objectives.splice(objectiveIndex, 1);
    this.saveArmy(army);
  }

  inspireTeam(squadIndex: number): void {
    let army = [...this._army.getValue()];
    army[squadIndex].units = army[squadIndex].units.map((unit) => {
      unit.actionTokens = unit.actionTokens.map((token) => {
        token.isUsed = false;
        return token;
      });
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

  getUnit(squadIndex: number, unitIndex: number): Observable<iCrCzUnitCard> {
    return this.army.pipe(
      take(1),
      map((army) => army[squadIndex].units[unitIndex])
    );
  }

  addUnit(
    armyIndex: number,
    unit: iCrCzUnitCardData,
    streetCred: number
  ): void {
    let army = [...this._army.getValue()];
    let newUnit: CrCzUnit = new CrCzUnit();
    newUnit.name = unit.name;
    newUnit.eb = unit.eb;
    newUnit.cred = streetCred;
    const chosenRank = unit.ranks.filter((rank) => rank.cred === streetCred)[0];
    if (chosenRank) {
      newUnit.keywords = [...unit.keywords];
      if(chosenRank?.keywords){
        newUnit.keywords.push(...chosenRank.keywords);
      }

      newUnit.armor = chosenRank.armor;
      newUnit.melee = chosenRank.melee;
      newUnit.ranged = chosenRank.ranged;
      newUnit.reflex = chosenRank.reflex;
      newUnit.tech = chosenRank.tech;
      newUnit.med = chosenRank.med;
      newUnit.influence = chosenRank.influence;
      newUnit.actions = chosenRank.actions;
      newUnit.unitGear = chosenRank.unitGear;
      newUnit.specialRules = chosenRank.specialRules;
      newUnit.actionTokens = chosenRank.actions.map((action) => {
        return { type: action, isUsed: false, isRed: false };
      });
      newUnit.gearCards = new Array<iCrCzGearItemCard>();
      newUnit.programs = new Array<iCrCzNrProgramCard>();
      newUnit.loot = new Array<iCrCzLootCard>();

      army[armyIndex].units.push(newUnit);
      this.saveArmy(army);
    }

  }

  hasUnit(
    squadIndex: number,
    unitName: string,
    unitStreetcred: number
  ): boolean {
    let army = this._army.getValue();
    return army[squadIndex]?.units.some(
      (unit: iCrCzUnitCard) =>
        unit?.name === unitName && unit?.cred == unitStreetcred
    );
  }

  hasSpecialist(squadIndex: number, unitName: string): boolean {
    let army = this._army.getValue();
    return army[squadIndex]?.units.some(
      (unit: iCrCzUnitCard) =>
        unit?.name === unitName && unit?.keywords.includes('specialist')
    );
  }

  hasLeader(squadIndex: number): boolean {
    let army = this._army.getValue();
    return army[squadIndex]?.units.some((unit: iCrCzUnitCard) =>
      unit?.keywords.includes('leader')
    );
  }

  leaderCount(squadIndex: number): number {
    let army = this._army.getValue();
    return army[squadIndex]?.units.filter((unit: iCrCzUnitCard) =>
      unit?.keywords.includes('leader')
    ).length;
  }

  countOfUnit(
    squadIndex: number,
    unitName: string,
    unitStreetcred: number
  ): number {
    let army = this._army.getValue();
    return army[squadIndex]?.units.filter(
      (unit: CrCzUnit) =>
        unit?.name === unitName && unit?.cred == unitStreetcred
    ).length;
  }

  getSquadGearList(squadIndex: number): Observable<Array<string>> {
    return this.army.pipe(
      map((army) => {
        let list = new Array<string>();
        army[squadIndex].units.forEach((unit) => {
          const unitGear = unit.gearCards.map((gear) => gear.name);
          if (unitGear.length > 0) {
            list.push(...unitGear);
          }
        });
        return list;
      })
    );
  }

  removeUnit(armyIndex: number, unitIndex: number): void {
    let army = this._army.getValue();
    army[armyIndex].units.splice(unitIndex, 1);
    this.saveArmy(army);
  }

  updateUnit(squadIndex: number, unitIndex: number, unit: iCrCzUnitCard): void {
    let army = this._army.getValue();
    army[squadIndex].units[unitIndex] = CreateCombatZoneUnitFromObject(unit);
    this.saveArmy(army);
  }

  updateSquadNotes(squadIndex: number, notes: string): void {
    let army = this._army.getValue();
    army[squadIndex].notes = notes;
    this.saveArmy(army);
  }
}
