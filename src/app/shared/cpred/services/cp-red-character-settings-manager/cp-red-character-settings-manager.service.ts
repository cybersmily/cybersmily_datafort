import { LocalStorageManagerService } from './../../../services/local-storage-manager/local-storage-manager.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CpRedCharacterSettings } from '../../models';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CpRedCharacterSettingsManagerService {
  private _settings: BehaviorSubject<CpRedCharacterSettings> =
    new BehaviorSubject<CpRedCharacterSettings>({});
  settings: Observable<CpRedCharacterSettings> = this._settings.asObservable();

  private _SETTINGS_KEY = 'cpr-char-settings';

  constructor(private storageService: LocalStorageManagerService) {}

  initialize() {
    this.load();
  }

  update(settings: CpRedCharacterSettings) {
    this._settings.next(settings);
    this.save();
  }

  save() {
    this.storageService.store<CpRedCharacterSettings>(
      this._SETTINGS_KEY,
      this._settings.getValue()
    );
  }

  load() {
    if (this.storageService.hasKey(this._SETTINGS_KEY)) {
      const settings = this.storageService.retrive<CpRedCharacterSettings>(
        this._SETTINGS_KEY
      );
      1;
      this._settings.next(settings);
    }
  }
}
