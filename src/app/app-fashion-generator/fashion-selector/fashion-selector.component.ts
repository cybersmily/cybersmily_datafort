import { ClothingArmor } from './../../shared/models/clothing/clothing-armor';
import { ClothingOption } from './../../shared/models/clothing/clothing-option';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-fashion-selector',
  templateUrl: './fashion-selector.component.html',
  styleUrls: ['./fashion-selector.component.css']
})
export class FashionSelectorComponent implements OnInit, OnChanges {
  /**
   * Label to display for the dropdown.
   * @type {string}
   * @memberof FashionSelectorComponent
   */
  @Input()
  label: string = '';

  /**
   * Data to use in the dropdown.
   * @type {any[]}
   * @memberof FashionSelectorComponent
   */
  @Input()
  data: ClothingOption[] = new Array<ClothingOption>();

  @Input()
  selectedValue: ClothingOption | ClothingArmor = {name: '', mod: 0};

  @Input()
  isRequired: boolean = false;

  @Output()
  selectOption: EventEmitter<any> = new EventEmitter<any>();

  currSelection: ClothingOption | ClothingArmor = {name: '', mod: 0};

  constructor() { }

  ngOnChanges() {
    this.currSelection = this.selectedValue;
  }

  ngOnInit() {
    this.currSelection = this.selectedValue;
  }

  onChange(event) {
    this.selectOption.emit(this.currSelection);
  }
}
