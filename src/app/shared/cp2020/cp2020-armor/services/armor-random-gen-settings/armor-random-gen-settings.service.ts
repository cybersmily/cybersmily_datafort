import { StorageKeys } from './../../../../enums/storage-keys';
import { LocalStorageManagerService } from './../../../../services/local-storage-manager/local-storage-manager.service';
import { CP2020ArmorRandomSettings } from './../../models/armor-random-settings';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArmorRandomGenSettingsService {
  private _settings = new BehaviorSubject<CP2020ArmorRandomSettings>(new CP2020ArmorRandomSettings());
  settings = this._settings.asObservable();
  private _currSettings: CP2020ArmorRandomSettings;

  constructor(private localStorageManagerService: LocalStorageManagerService) {
    if(this._currSettings == null) {
      this._currSettings = this.localStorageManagerService.retrive<CP2020ArmorRandomSettings>(StorageKeys.ARMOR_GENERATOR_SETTINGS);
    }
    this._settings.next(this._currSettings);
   }

  update(settings: CP2020ArmorRandomSettings) {
    this._currSettings = settings;
    this._settings.next(this._currSettings);
    this.localStorageManagerService.store<CP2020ArmorRandomSettings>(StorageKeys.ARMOR_GENERATOR_SETTINGS, this._currSettings);
  }
}
