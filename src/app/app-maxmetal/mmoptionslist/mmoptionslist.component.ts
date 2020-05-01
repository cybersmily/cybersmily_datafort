import { MaxMetalVehicle } from './../../shared/models/maxmetal/max-metal-vehicle';
import { MaxMetalOption } from './../../shared/models/maxmetal/max-metal-option';
import { MaxMetalVehOptList } from './../../shared/models/maxmetal/max-metal-veh-opt-list';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-mmoptionslist',
  templateUrl: './mmoptionslist.component.html',
  styleUrls: ['./mmoptionslist.component.css']
})
export class MmoptionslistComponent implements OnInit {

  @Input()
  optionList: MaxMetalVehOptList = new MaxMetalVehOptList();

  @Input()
  vehicle: MaxMetalVehicle = new MaxMetalVehicle();

  @Output()
  removeOption = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeOpt(option: MaxMetalOption) {
    this.removeOption.emit(option);
  }
}
