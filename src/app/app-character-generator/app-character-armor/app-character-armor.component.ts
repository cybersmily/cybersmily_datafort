import { Cp2020ArmorBlock } from './../../shared/models/cp2020character';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-app-character-armor',
  templateUrl: './app-character-armor.component.html',
  styleUrls: ['./app-character-armor.component.css']
})
export class AppCharacterArmorComponent implements OnInit {

  @Input()
  armor = new Cp2020ArmorBlock();

  @Output()
  changeArmor = new EventEmitter<Cp2020ArmorBlock>();

  constructor() { }

  ngOnInit() {
  }

  onChangeArmor() {
    this.changeArmor.emit(this.armor);
  }

}
