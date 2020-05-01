import { Cp2020PlayerGearList } from './../../shared/models/cp2020character/cp2020-player-gear-list';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-app-character-gear',
  templateUrl: './app-character-gear.component.html',
  styleUrls: ['./app-character-gear.component.css']
})
export class AppCharacterGearComponent implements OnInit {

  @Input()
  gear = new Cp2020PlayerGearList(25);

  @Output()
  changeGear = new EventEmitter<Cp2020PlayerGearList>();

  constructor() { }

  ngOnInit() {
  }

  onGearChange() {
    this.changeGear.emit(this.gear);
  }

}
