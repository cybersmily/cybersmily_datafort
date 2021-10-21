import { Cp2020ProgramList } from '../../cp2020/cp2020-netrun-gear/models';
import { Cp2020Cyberdeck } from '../../cp2020/cp2020-netrun-gear/models';
import { CacheKeys } from './../../cache-keys';
import { BehaviorSubject } from 'rxjs';
import { Cp2020CyberdeckManager } from '../../cp2020/cp2020-netrun-gear/models';
import { Injectable } from '@angular/core';
import { CyberdeckManager } from '../../cp2020/cp2020-netrun-gear/models';

@Injectable({
  providedIn: 'root'
})
export class NrDeckManagerService {
  private _deckManager: BehaviorSubject<Cp2020CyberdeckManager> = new BehaviorSubject<Cp2020CyberdeckManager>(new Cp2020CyberdeckManager());

  deckManager = this._deckManager.asObservable();

  private curDeckManager: Cp2020CyberdeckManager = new Cp2020CyberdeckManager();

  constructor() {
    this.curDeckManager = this.cache;
    this._deckManager.next(this.curDeckManager);
  }

  private set cache(manager: Cp2020CyberdeckManager) {
    window.localStorage
    .setItem(CacheKeys.CP2020_DECK_MANAGER, JSON.stringify(manager));
  }

  private get cache(): Cp2020CyberdeckManager {
    let manager = new Cp2020CyberdeckManager();
    if (window.localStorage.getItem(CacheKeys.CP2020_DECK_MANAGER)) {
      const result: CyberdeckManager = JSON.parse(window.localStorage.getItem(CacheKeys.CP2020_DECK_MANAGER));
      manager = new Cp2020CyberdeckManager(result);
    }
    return manager;
  }

  private updateModel(model: Cp2020CyberdeckManager) {
    this._deckManager.next(model);
    this.cache = model;
  }

  upload(model: Cp2020CyberdeckManager) {
    this.curDeckManager = model;
    this.updateModel(model);
  }

  updateDeck(deck: Cp2020Cyberdeck) {
    this.curDeckManager.deck = new Cp2020Cyberdeck(deck);
    this.updateModel(this.curDeckManager);
  }

  updateList(list: Cp2020ProgramList) {
    this.curDeckManager.programList = list;
    this.updateModel(this.curDeckManager);
  }

  clear() {
    this.curDeckManager = new Cp2020CyberdeckManager();
    this.updateModel(this.curDeckManager);
  }

}
