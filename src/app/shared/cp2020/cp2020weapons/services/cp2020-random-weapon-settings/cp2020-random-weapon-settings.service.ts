import { Observable, of, BehaviorSubject } from 'rxjs';
import { RandomWeaponFilters } from './../../models/random-weapon-filters';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020RandomWeaponSettingsService {
  private _settings: BehaviorSubject<RandomWeaponFilters> =
    new BehaviorSubject<RandomWeaponFilters>({});
  settings: Observable<RandomWeaponFilters> = this._settings.asObservable();

  constructor() {}

  setSettings(filters: RandomWeaponFilters) {
    this._settings.next(filters);
  }
}
