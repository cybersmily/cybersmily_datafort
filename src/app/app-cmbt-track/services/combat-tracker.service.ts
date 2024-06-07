import { JsonDataFiles, DataService } from './../../shared/services/file-services';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CombatTrackerService {

  _modifiers = new BehaviorSubject<CyberpunkCombatModifierData>(null);
  modifiers = this._modifiers.asObservable();

  _cp2020cover = new BehaviorSubject<Array<CP2020CombatCover>>([]);
  cp2020cover = this._cp2020cover.asObservable();

  constructor(private dataService: DataService) {
    this.dataService
    .GetJson<CyberpunkCombatModifierData>(JsonDataFiles.CP2020_CMBTTRCK_MODIFIERS_JSON)
    .subscribe( data => {
      this._cp2020cover.next(data.CP2020.structureCover);
      this._modifiers.next(data);
    });
  }

}

export interface CyberpunkCombatModifierData {
  CP2020: CP2020CombatModifiersData;
}

export interface CP2020CombatModifiersData {
  target: Array<CP2020CombatModifier>;
  attacher: Array<CP2020CombatModifier>;
  structureCover: Array<CP2020CombatCover>;
}

export interface CP2020CombatModifier {
  name: string;
  mod: number;
  selected: boolean;
}

export interface CP2020CombatCover {
  name: string;
  sp: number;
}
