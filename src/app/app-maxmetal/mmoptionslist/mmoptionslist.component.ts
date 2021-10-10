import { MaxMetalVehicle, MaxMetalOption, MaxMetalVehOptList } from './../../shared/cp2020/cp2020-vehicles/models';
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
