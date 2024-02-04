import { Observable, of, BehaviorSubject } from 'rxjs';
import { RandomWeaponFilters, RandomWeaponSettings } from './../../models/random-weapon-filters';
import { Injectable } from '@angular/core';
import { LocalStorageManagerService } from './../../../../services/local-storage-manager/local-storage-manager.service';

@Injectable({
  providedIn: 'root',
})
export class Cp2020RandomWeaponSettingsService {
  private _CP2020_WEAPON_RAND_SETTINGS = 'cp2020randwweaponsettings';
  private _settings: BehaviorSubject<RandomWeaponSettings> =
    new BehaviorSubject<RandomWeaponSettings>({count: 1, filters: {
      type: ['P', 'SMG', 'RIF', 'MEL', 'SHT'],
      availability: ['E', 'C'],}});
  settings: Observable<RandomWeaponSettings> = this._settings.asObservable();

  constructor(private localStorageService: LocalStorageManagerService) {
    if(this.localStorageService.hasKey(this._CP2020_WEAPON_RAND_SETTINGS)) {
     this._settings.next(this.localStorageService.retrive<RandomWeaponSettings>(this._CP2020_WEAPON_RAND_SETTINGS));
    }
  }

  setSettings(filters: RandomWeaponSettings) {
    this._settings.next(filters);
    this.localStorageService.store<RandomWeaponSettings>(this._CP2020_WEAPON_RAND_SETTINGS, filters);
  }

  setFilters(filters: RandomWeaponFilters) {
    const settings = this._settings.value;
    settings.filters = filters;
    this.setSettings(settings);
  }
}
