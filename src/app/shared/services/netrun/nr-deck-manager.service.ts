import { Cp2020ProgramList } from '../../cp2020/cp2020-netrun-gear/models';
import { Cp2020NetrunDeck } from '../../cp2020/cp2020-netrun-gear/models';
import { CacheKeys } from './../../cache-keys';
import { BehaviorSubject } from 'rxjs';
import { Cp2020DeckManager } from '../../cp2020/cp2020-netrun-gear/models';
import { Injectable } from '@angular/core';
import { NrDeckManager } from '../../cp2020/cp2020-netrun-gear/models';

@Injectable({
  providedIn: 'root'
})
export class NrDeckManagerService {
  private _deckManager: BehaviorSubject<Cp2020DeckManager> = new BehaviorSubject<Cp2020DeckManager>(new Cp2020DeckManager());

  deckManager = this._deckManager.asObservable();

  private curDeckManager: Cp2020DeckManager = new Cp2020DeckManager();

  constructor() {
    this.curDeckManager = this.cache;
    this._deckManager.next(this.curDeckManager);
  }

  private set cache(manager: Cp2020DeckManager) {
    window.localStorage
    .setItem(CacheKeys.CP2020_DECK_MANAGER, JSON.stringify(manager));
  }

  private get cache(): Cp2020DeckManager {
    let manager = new Cp2020DeckManager();
    if (window.localStorage.getItem(CacheKeys.CP2020_DECK_MANAGER)) {
      const result: NrDeckManager = JSON.parse(window.localStorage.getItem(CacheKeys.CP2020_DECK_MANAGER));
      manager = new Cp2020DeckManager(result);
    }
    return manager;
  }

  private updateModel(model: Cp2020DeckManager) {
    this._deckManager.next(model);
    this.cache = model;
  }

  upload(model: Cp2020DeckManager) {
    this.curDeckManager = model;
    this.updateModel(model);
  }

  updateDeck(deck: Cp2020NetrunDeck) {
    this.curDeckManager.deck = deck;
    this.updateModel(this.curDeckManager);
  }

  updateList(list: Cp2020ProgramList) {
    this.curDeckManager.programList = list;
    this.updateModel(this.curDeckManager);
  }

  clear() {
    this.curDeckManager = new Cp2020DeckManager();
    this.updateModel(this.curDeckManager);
  }

}
