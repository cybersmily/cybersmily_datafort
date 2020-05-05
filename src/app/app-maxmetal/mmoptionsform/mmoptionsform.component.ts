import { MaxMetalOptionCategory } from './../../shared/models/maxmetal/max-metal-option-category';
import { MaxMetalVehicle } from './../../shared/models/maxmetal/max-metal-vehicle';
import { MaxMetalOption } from './../../shared/models/maxmetal/max-metal-option';
import { MaxMetalDataService } from '../../shared/services/maxmetal/max-metal-data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-mmoptionsform',
  templateUrl: './mmoptionsform.component.html',
  styleUrls: ['./mmoptionsform.component.css']
})
export class MmoptionsformComponent implements OnInit {

  @Input()
  vehicle: MaxMetalVehicle;

  @Output()
  addOption = new EventEmitter();

  options: any[];
  selectedCategory: any =  null;
  selectedOption: MaxMetalOption = null;
  currOption: MaxMetalOption;
  addDisabled: boolean;

  get Options(): Array<MaxMetalOption> {
    if (this.selectedCategory) {
      return this.selectedCategory.value.items;
    }
    return new Array<MaxMetalOption>();
  }

  constructor(private mmDataService: MaxMetalDataService) { }

  ngOnInit() {
    this.currOption = new MaxMetalOption();
    this.addDisabled = true;
    this.mmDataService.loadOptions().subscribe( data => {
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
    this.addDisabled = (this.currOption.name === '');
  }

  addOpt() {
    this.addOption.emit(this.currOption);
  }
}
