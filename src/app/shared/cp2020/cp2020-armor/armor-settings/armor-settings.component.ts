import { CP2020ArmorRandomSettings, Cp2020ArmorAttributeLists } from './../models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ArmorDataAttributesService } from '../services';

@Component({
  selector: 'cs-armor-settings',
  templateUrl: './armor-settings.component.html',
  styleUrls: ['./armor-settings.component.css']
})
export class ArmorSettingsComponent implements OnInit {

  @Input()
  settings = new CP2020ArmorRandomSettings();

  @Output()
  change = new EventEmitter<CP2020ArmorRandomSettings>();

  currSettings = new CP2020ArmorRandomSettings();
  armorAttributes = new Cp2020ArmorAttributeLists();

  constructor(private armorDataAttributesService: ArmorDataAttributesService) { }

  ngOnInit(): void {
    this.currSettings = this.settings;
    this.armorDataAttributesService.getData()
    .subscribe(data => {
      this.armorAttributes = data;
    });
  }

  update() {
    this.currSettings.maxCost = this.currSettings.maxCost < 100 ? 100 : this.currSettings.maxCost;
    this.change.emit(this.currSettings);
  }

}
