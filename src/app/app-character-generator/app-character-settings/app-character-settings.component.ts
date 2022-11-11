import { Cp2020CharGenSettings } from './../../shared/cp2020/models/cp2020-char-gen-settings';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'cs-app-character-settings',
  templateUrl: './app-character-settings.component.html',
  styleUrls: ['./app-character-settings.component.css'],
})
export class AppCharacterSettingsComponent implements OnInit, AfterViewInit {
  @Input()
  settings: Cp2020CharGenSettings = new Cp2020CharGenSettings();

  @Input()
  sources: Array<any> = new Array<any>();

  @ViewChild('iuSetting')
  iuSettingElem: ElementRef;

  currSettings = new Cp2020CharGenSettings();

  @Output()
  updateSettings: EventEmitter<Cp2020CharGenSettings> = new EventEmitter<Cp2020CharGenSettings>();

  constructor() {}

  ngOnInit(): void {
    this.currSettings = new Cp2020CharGenSettings(this.settings);
  }

  ngAfterViewInit(): void {
    this.iuSettingElem.nativeElement.focus();
  }

  saveSettings() {
    this.updateSettings.emit(this.currSettings);
  }
}
