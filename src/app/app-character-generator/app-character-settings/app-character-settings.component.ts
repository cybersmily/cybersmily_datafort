import { Cp2020CharGenSettings } from './../../shared/cp2020/models/cp2020-char-gen-settings';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-app-character-settings',
  templateUrl: './app-character-settings.component.html',
  styleUrls: ['./app-character-settings.component.css']
})
export class AppCharacterSettingsComponent implements OnInit {

  @Input()
  settings: Cp2020CharGenSettings = new Cp2020CharGenSettings();

  @Input()
  sources: Array<any> = new Array<any>();

  currSettings = new Cp2020CharGenSettings();

  @Output()
  updateSettings: EventEmitter<Cp2020CharGenSettings> = new EventEmitter<Cp2020CharGenSettings>();

  constructor() { }

  ngOnInit(): void {
    this.currSettings = new Cp2020CharGenSettings(this.settings);
  }

  saveSettings() {
    this.updateSettings.emit(this.currSettings);
  }

}
