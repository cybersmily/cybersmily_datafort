import { CmbtTrckOppSelection } from '../../shared/models/cmbt-trck/cmbt-trck-opp-selection';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CmbtTrckOpponent } from '../../shared/models/cmbt-trck/cmbt-trck-opponent';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpponentTrackerService {

  private _STORAGE_KEY = 'CybersmilyDF-opponents';

  private _opponents = new BehaviorSubject<Array<CmbtTrckOpponent>>(new Array<CmbtTrckOpponent>());
  opponents = this._opponents.asObservable();

  private _selected = new BehaviorSubject<CmbtTrckOpponent>(new CmbtTrckOpponent());
  selected = this._selected.asObservable();

  constructor(private diceService: DiceService) {
    const opps = this.cache;
    if (opps.length < 1) {
      this._opponents.next(this.loadtestdata());
    } else {
      this._opponents.next(opps);
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
    return opponents;
   }

   set cache(opps: Array<CmbtTrckOpponent>) {
    if (window.localStorage) {
      window.localStorage.setItem(this._STORAGE_KEY, JSON.stringify(this._opponents.getValue()));
    }
   }


  /**
   * Roll initiative for all the Opponents
   *
   * @memberof CmbtTrckFormComponent
   */
  rollInitiative(id?: number) {
    const opps = this._opponents.getValue();
    if (id === undefined || id == null) {
      // roll initiative for all opponents.
      opps.map(opp => {
        opp.calculateInitiative(this.getDieRoll());
      });
    } else {
      const index = this._opponents.getValue().findIndex(o => o.id === id);
      if (index > -1 ) {
        opps[index].calculateInitiative(this.getDieRoll());
      }
    }
    this.sortInitiative(opps);
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

  getOpponent(id: number): CmbtTrckOpponent {
    return this._opponents.getValue().filter(o => o.id === id)[0];
  }

  /**
   * Add a new opponent to the tracker.
   *
   * @memberof CmbtTrckFormComponent
   */
  addOpponent(opponent?: CmbtTrckOpponent, newId?: boolean) {
    const opps = this._opponents.getValue();
    if (opponent) {
      const newOpp = new CmbtTrckOpponent(opponent, newId);
      newOpp.name = this.checkName(newOpp.name);
      opps.push(newOpp);
    } else {
      const name = this.checkName('Opp1');
      opps.push(new CmbtTrckOpponent({name: name}));
    }
    this._opponents.next(opps);
    this.cache = opps;
  }

  /**
   * Remove oppenent from the tracker
   *
   * @memberof CmbtTrckFormComponent
   */
  removeOpponent(index: number) {
    const opps = this._opponents.getValue();
    opps.splice(index, 1);
    this._opponents.next(opps);
    this.cache = opps;
  }

  changeOpponent( opp: CmbtTrckOpponent) {
    opp.weapons = opp.weapons.sort( (a, b) => (b.name.toLowerCase() < a.name.toLowerCase()) ? 1 : -1);
    opp.cyberware = opp.cyberware.sort( (a, b) => (b.name.toLowerCase() < a.name.toLowerCase()) ? 1 : -1);
    opp.gear = opp.gear.sort( (a, b) => (b.toLowerCase() < a.toLowerCase()) ? 1 : -1);
    const opps = this._opponents.getValue();
    const index = opps.findIndex( o => o.id === opp.id);
    opps[index] = new CmbtTrckOpponent(opp);
    this._opponents.next(opps);
    this.cache = opps;
  }

  woundOpponent(value: number) {

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
    return this._opponents.getValue().filter((o, i) => o.name.toLowerCase() === name.toLowerCase() && ( i !== index)).length > 0 ;
  }


  /**
   * Sort the iniative based on roll then REF
   *
   * @memberof CmbtTrckFormComponent
   */
  sortInitiative(opps?: Array<CmbtTrckOpponent>) {
    if (opps.length < 1) {
      opps = this._opponents.getValue();
    }
    opps.sort( (a, b) => {
      if (a.initRoll === b.initRoll) {
        return b.stats.REF.Adjusted - a.stats.REF.Adjusted;
      }
      return a.initRoll < b.initRoll ? 1 : a.initRoll > b.initRoll ? -1 : 0;
    });
    this._opponents.next(opps);
    this.cache = opps;
  }

  loadtestdata(): Array<CmbtTrckOpponent> {
    const opps = new Array<CmbtTrckOpponent>();
    for (let i = 0; i < 3; i++) {
      const opp = new CmbtTrckOpponent();
      opp.name = 'Opp' + (i + 1);
      opp.id = new Date().getTime() + i;
      opps.push(opp);
    }
    return opps;
  }

  importArray(list: Array<CmbtTrckOpponent>) {
    const opps = new Array<CmbtTrckOpponent>();
    list.forEach( opp => {
      const opponent = new CmbtTrckOpponent(opp);
      opps.push( opponent);
    });
    this._opponents.next(opps);
    this.cache = opps;
  }

  clear() {
    this._opponents.next(this.loadtestdata());
    localStorage.removeItem(this._STORAGE_KEY);
  }

}
