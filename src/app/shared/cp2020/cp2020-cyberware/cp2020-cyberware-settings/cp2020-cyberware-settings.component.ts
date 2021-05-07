import { Cp2020CyberwareGenSettings } from './../models/cp2020-cyberware-gen-settings';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-cyberware-settings',
  templateUrl: './cp2020-cyberware-settings.component.html',
  styleUrls: ['./cp2020-cyberware-settings.component.css']
})
export class Cp2020CyberwareSettingsComponent implements OnInit {

  @Input()
  settings: Cp2020CyberwareGenSettings;

  types: Array<string> = new Array<string>();
  subtypes: Array<string> = new Array<string>();
  costLimit: number = 1000;
  default: boolean = true;


  @Output()
  updateSettings: EventEmitter<Cp2020CyberwareGenSettings> = new EventEmitter<Cp2020CyberwareGenSettings>();

  constructor() { }

  ngOnInit(): void {
    if (this.settings){
      this.types = this.settings.types ;
      this.subtypes = this.settings.subtypes;
      this.costLimit = this.settings.costLimit;
      this.default = this.settings.default;
    }
  }

  update() {
    const results: Cp2020CyberwareGenSettings = {
      types: this.types,
      subtypes: this.subtypes,
      costLimit: this.costLimit,
      default: this.default
    }
    this.updateSettings.emit(results);
  }

  updateType(value: string) {
    const index = this.types.findIndex( val =>  val === value);
    if (index) {
      this.types.splice(index, 1);
    } else {
      this.types.push(value);
    }
    this.update();
  }

  updateSubtype(value: string) {
    const index = this.subtypes.findIndex( val =>  val === value);
    if (index) {
      this.subtypes.splice(index, 1);
    } else {
      this.subtypes.push(value);
    }
    this.update();
  }

}
