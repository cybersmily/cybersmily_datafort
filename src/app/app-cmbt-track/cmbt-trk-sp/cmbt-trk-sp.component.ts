import { OpponentArmor } from './../models/opponent-armor';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trk-sp',
  templateUrl: './cmbt-trk-sp.component.html',
  styleUrls: ['./cmbt-trk-sp.component.css']
})
export class CmbtTrkSpComponent implements OnInit {

  @Input()
  armor: OpponentArmor = { head: 0, torso: 0, rarm: 0, larm: 0, rleg: 0, lleg: 0 };

  @Output()
  updateArmor = new EventEmitter<OpponentArmor>();

  constructor() { }

  ngOnInit() {
  }

  changeArmor() {
    this.updateArmor.emit(this.armor);
  }

}
