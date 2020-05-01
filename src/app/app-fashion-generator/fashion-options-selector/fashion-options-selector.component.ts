import { ClothingOption } from '../../shared/models/clothing';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-fashion-options-selector',
  templateUrl: './fashion-options-selector.component.html',
  styleUrls: ['./fashion-options-selector.component.css']
})
export class FashionOptionsSelectorComponent implements OnInit {

  @Input()
  options: ClothingOption[] = new Array<ClothingOption>();
  @Input()
  currWeight: string = '';

  @Output()
  checkOption: EventEmitter<ClothingOption[]> = new EventEmitter<ClothingOption[]>();

  selectedOptions: ClothingOption[];
  constructor() { }

  ngOnInit() {
    this.selectedOptions = new Array();
  }

  /**
   * Determines if the modifiers are based on the cloting
   * weight property.
   * @param {*} value - the value to test if it is weight based.
   * @returns {*} - the value of the weight.
   * @memberof FashionInputComponent
   */
  isWeightBase(value: any): any {
    if ( typeof(value.Hvy) !== 'undefined') {
      return value[this.currWeight];
    }
    return value;
  }

  toggleOption(optionName: string) {
    const found: number = this.selectedOptions.findIndex( value => {
      return value.name === optionName;
    });
    if ( found > -1) {
      this.selectedOptions.splice(found, 1);
    } else {
      const option = this.options.find( opt => {
          return opt.name === optionName;
      });
      this.selectedOptions.push(option);
    }
    this.checkOption.emit(this.selectedOptions);
  }

}
