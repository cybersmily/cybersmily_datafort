import {
  MaxMetalVehicle,
  MaxMetalOption,
} from './../../shared/cp2020/cp2020-vehicles/models';
import { MaxMetalDataService } from '../../shared/cp2020/cp2020-vehicles/services';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-mmoptionsform',
    templateUrl: './mmoptionsform.component.html',
    styleUrls: ['./mmoptionsform.component.css'],
    standalone: false
})
export class MmoptionsformComponent implements OnInit {
  @Input()
  vehicle: MaxMetalVehicle;

  @Output()
  addOption = new EventEmitter();

  options: any[];
  selectedCategory: any = null;
  selectedOption: MaxMetalOption = null;
  currOption: MaxMetalOption;
  addDisabled: boolean;

  get Options(): Array<MaxMetalOption> {
    if (this.selectedCategory) {
      return this.selectedCategory.value.items;
    }
    return new Array<MaxMetalOption>();
  }

  get currOptionSpaces(): number {
    return this.currOption.calculateSpaces(this.vehicle.maxSpaces);
  }

  get currOptionCost(): number {
    return this.currOption.calculateCost(this.vehicle.baseCost);
  }

  constructor(private mmDataService: MaxMetalDataService) {}

  ngOnInit() {
    this.currOption = new MaxMetalOption();
    this.addDisabled = true;
    this.mmDataService.loadOptions().subscribe((data) => {
      this.options = data;
    });
  }
  changeCategory() {
    this.selectedOption = null;
    this.currOption = new MaxMetalOption();
  }

  changeOption() {
    this.currOption = new MaxMetalOption();
    this.currOption.copy(this.selectedOption);
    this.addDisabled = this.currOption.name === '';
  }

  addOpt() {
    this.addOption.emit(this.currOption);
  }
}
