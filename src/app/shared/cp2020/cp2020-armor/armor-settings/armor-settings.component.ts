import { ArmorRandomGenSettingsService } from './../services/armor-random-gen-settings/armor-random-gen-settings.service';
import { CP2020ArmorRandomSettings, Cp2020ArmorAttributeLists } from './../models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ArmorDataAttributesService } from '../services';

@Component({
  selector: 'cs-armor-settings',
  templateUrl: './armor-settings.component.html',
  styleUrls: ['./armor-settings.component.css']
})
export class ArmorSettingsComponent implements OnInit {

  currSettings = new CP2020ArmorRandomSettings();
  armorAttributes = new Cp2020ArmorAttributeLists();

  @Output()
  updateSettings:EventEmitter<CP2020ArmorRandomSettings> = new EventEmitter<CP2020ArmorRandomSettings>();

  constructor(private armorDataAttributesService: ArmorDataAttributesService,
    private randomSettingsService: ArmorRandomGenSettingsService) { }

  ngOnInit(): void {
    this.randomSettingsService.settings.subscribe( settings => {
      this.currSettings = settings;
    });
    this.armorDataAttributesService.getData()
    .subscribe(data => {
      this.armorAttributes = data;
    });
  }

  update() {
    this.currSettings.maxCost = this.currSettings.maxCost < 100 ? 100 : this.currSettings.maxCost;
    this.randomSettingsService.update(this.currSettings);
    this.updateSettings.emit(this.currSettings);
  }

}
