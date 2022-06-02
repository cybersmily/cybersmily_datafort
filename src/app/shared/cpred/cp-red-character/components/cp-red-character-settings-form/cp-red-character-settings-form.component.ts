import { CpRedCharacterSettingsManagerService } from './../../../services/cp-red-character-settings-manager/cp-red-character-settings-manager.service';
import { Observable } from 'rxjs';
import { CpRedCharacterSettings } from './../../../models/cp-red-character-settings';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-character-settings-form',
  templateUrl: './cp-red-character-settings-form.component.html',
  styleUrls: ['./cp-red-character-settings-form.component.css'],
})
export class CpRedCharacterSettingsFormComponent implements OnInit {
  currSettings: CpRedCharacterSettings = {};

  constructor(private settingsService: CpRedCharacterSettingsManagerService) {}

  ngOnInit(): void {}

  initialize() {
    this.settingsService.settings.subscribe((settings) => {
      this.currSettings = settings;
    });
  }

  update() {
    this.settingsService.update(this.currSettings);
  }
}
