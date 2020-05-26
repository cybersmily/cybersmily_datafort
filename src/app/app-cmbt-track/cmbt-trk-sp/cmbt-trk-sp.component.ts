import { Cp2020ArmorBlock } from './../../shared/models/cp2020character';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trk-sp',
  templateUrl: './cmbt-trk-sp.component.html',
  styleUrls: ['./cmbt-trk-sp.component.css']
})
export class CmbtTrkSpComponent implements OnInit {

  @Input()
  armor: Cp2020ArmorBlock = new Cp2020ArmorBlock();

  @Output()
  updateArmor = new EventEmitter<Cp2020ArmorBlock>();

  spDamage = 0;
  selectedLocation = '';
  constructor() { }

  ngOnInit() {
  }

  changeArmor() {
    this.updateArmor.emit(this.armor);
  }

  damage() {
    this.armor.damageSP(this.selectedLocation, this.spDamage);
    this.changeArmor();
  }

}
