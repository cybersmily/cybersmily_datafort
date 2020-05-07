import { CmbtTrckOppSelection } from './../models/cmbt-trck-opp-selection';
import { CmbtTrckOppTemplate } from './../models/cmbt-trck-opp-template';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CmbtTrckOpponent } from './../models/cmbt-trck-opponent';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cp2020PlayerSkill } from './../../shared/models/cp2020character';

@Injectable({
  providedIn: 'root'
})
export class OpponentTrackerService {

  private _STORAGE_KEY = 'CybersmilyDF-opponents';

  private _opponents = new BehaviorSubject<Array<CmbtTrckOpponent>>(new Array<CmbtTrckOpponent>());
  opponents = this._opponents.asObservable();

  curOpponents: Array<CmbtTrckOpponent>;

  constructor(private diceService: DiceService) {
    this.curOpponents = new Array<CmbtTrckOpponent>();
    this.curOpponents = this.cache;
    if (this.curOpponents.length < 1) {
      this.loadtestdata();
    }
   }

   get cache(): Array<CmbtTrckOpponent> {
     const opponents = new Array<CmbtTrckOpponent>();
    if (window.localStorage && window.localStorage.getItem(this._STORAGE_KEY)) {
      const stored = JSON.parse(window.localStorage.getItem(this._STORAGE_KEY));
      stored.forEach( opp => {
        const opponent = new CmbtTrckOpponent(opp);
        opponents.push( opponent);
      });
    }
    this._opponents.next(opponents);
    return opponents;
   }

   set cache(opps: Array<CmbtTrckOpponent>) {
    this._opponents.next(opps);
    if (window.localStorage) {
      window.localStorage.setItem(this._STORAGE_KEY, JSON.stringify(opps));
    }
   }

  /**
   * Roll initiative for all the Opponents
   *
   * @memberof CmbtTrckFormComponent
   */
  rollInitiative(index?: number) {
    if (index === undefined || index == null) {
      // roll initiative for all opponents.
      this.curOpponents.map(opp => {
        opp.calculateInitiative(this.getDieRoll());
      });
      this.sortInitiative();
    } else if (index >= 0 && index < this.curOpponents.length ) {
      this.curOpponents[index].calculateInitiative(this.getDieRoll());
      this.sortInitiative();
    }
    this.cache = this.curOpponents;
  }

  private getDieRoll(): Array<number> {
    const total = new Array<number>();
    let roll = this.diceService.generateNumber(1, 10);
    total.push(roll);
    while (roll === 10) {
      roll = this.diceService.generateNumber(1, 10);
      total.push(roll);
    }
    return total;
  }


  /**
   * Add a new opponent to the tracker.
   *
   * @memberof CmbtTrckFormComponent
   */
  addOpponent(opponent?: CmbtTrckOpponent) {
    if (opponent) {
      const newOpp = new CmbtTrckOpponent(opponent);
      newOpp.name = this.checkName(newOpp.name);
      this.curOpponents.push(newOpp);
    } else {
      const name = this.checkName('Opp1');
      this.curOpponents.push(new CmbtTrckOpponent({name: name}));
    }
    this.cache = this.curOpponents;
  }

  private checkName(name: string, index?: number): string {
    let newName = name;
    let attempts = 5;
    while (this.hasName(newName, index) && attempts > 0)  {
      // get the numbr from the name
      const num = new RegExp(/.*[0-9]+$/).test(newName);
      if ( num ) {
        const oldNum = newName.match(/[0-9]+$/g).map(Number)[0];
        const newNum = oldNum + 1;
        newName = newName.replace('' + oldNum, '' + newNum);
      } else {
        newName = newName + '1';
      }
      attempts--;
    }

    return newName;
  }

  private hasName( name: string, index?: number ): boolean {
    return this.curOpponents.filter((o, i) => o.name.toLowerCase() === name.toLowerCase() && ( i !== index)).length > 0 ;
  }

  /**
   * Remove oppenent from the tracker
   *
   * @memberof CmbtTrckFormComponent
   */
  removeOpponent(index: number) {
    this.curOpponents.splice(index, 1);
    this.cache = this.curOpponents;
  }

  /**
   * Sort the iniative based on roll then REF
   *
   * @memberof CmbtTrckFormComponent
   */
  sortInitiative() {
    this.sortOpponents();
    this.cache = this.curOpponents;
  }

  private sortOpponents() {
    this.curOpponents.sort( (a, b) => {
      if (a.initRoll === b.initRoll) {
        return b.stats.REF.Adjusted - a.stats.REF.Adjusted;
      }
      return a.initRoll < b.initRoll ? 1 : a.initRoll > b.initRoll ? -1 : 0;
    });
  }

  changeOpponent( opp: CmbtTrckOppSelection) {
    opp.opponent.weapons = opp.opponent.weapons.sort( (a, b) => (b.name.toLowerCase() < a.name.toLowerCase()) ? 1 : -1);
    opp.opponent.cyberware = opp.opponent.cyberware.sort( (a, b) => (b.name.toLowerCase() < a.name.toLowerCase()) ? 1 : -1);
    opp.opponent.gear = opp.opponent.gear.sort( (a, b) => (b.toLowerCase() < a.toLowerCase()) ? 1 : -1);
    this.curOpponents[opp.index] = opp.opponent;
    this.curOpponents[opp.index].name  = this.checkName(this.curOpponents[opp.index].name, opp.index);
    this.cache = this.curOpponents;
  }

  loadtestdata() {
    for (let i = 0; i < 3; i++) {
      const opp = new CmbtTrckOpponent();
      opp.name = 'Opp' + (i + 1);
      this.curOpponents.push(opp);
    }
    this.cache = this.curOpponents;
  }

  importArray(list: Array<CmbtTrckOpponent>) {
    this.curOpponents = new Array<CmbtTrckOpponent>();
    list.forEach( opp => {
      const opponent = new CmbtTrckOpponent(opp);
      this.curOpponents.push( opponent);
    });
    this.cache = this.curOpponents;
  }

  clear() {
    this.curOpponents = new Array<CmbtTrckOpponent>();
    this.loadtestdata();
  }

}
