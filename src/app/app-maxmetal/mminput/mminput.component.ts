import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-mminput',
    templateUrl: './mminput.component.html',
    styleUrls: ['./mminput.component.css'],
    standalone: false
})
export class MminputComponent implements OnInit {

  /**
   * Lable to prepend to the input box.
   * @type {string}
   * @memberof MminputComponent
   */
  @Input()
  label: string;


  /**
   * The value to increment when clicking on +/- buttons.
   * @type {number}
   * @memberof MminputComponent
   */
  @Input()
  increment: number;


  /**
   * The minimum value the input is allowed to have.
   * @type {number}
   * @memberof MminputComponent
   */
  @Input()
  min: number;


  /**
   * The maximum value the input is allowed to have.
   *
   * @type {number}
   * @memberof MminputComponent
   */
  @Input()
  max: number;


  /**
   * Value to set and pass with the input component. This is also
   * the base value that the component will use.
   * @type {number}
   * @memberof MminputComponent
   */
  @Input()
  inputValue: number;

  /**
   * determine if the controls in this component should be all disabled or not.
   * @type {boolean}
   * @memberof MminputComponent
   */
  @Input()
  maxDisabled: boolean;

  @Input()
  minDisabled: boolean;

  /**
   * Method to change the inputValue to and pass back to the parent component.
   * @memberof MminputComponent
   */
  @Output()
  changeValue = new EventEmitter();

  get disableMax(): boolean {
    return this.maxDisabled || this.inputValue >= this.max;
  }

  get disableMin(): boolean {
    return this.minDisabled || this.inputValue <= this.min;
  }


  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Increases the inputValue by the increment value passed to this component.
   * The increase will not exceed the max value passed to the component.
   * This then emits the changeValue method that is bound to the compnent.
   * @memberof MminputComponent
   */
  incrementValue() {
    if ( this.max === undefined) {
      this.changeValue.emit(this.increment);
    }
    if (this.max && this.inputValue < this.max) {
      this.changeValue.emit(this.increment);
    }
  }

  hasMax() {
    if (this.max !== undefined ) {
      return true;
    }
    return false;
  }
  /**
   * Decreases the inputValue by the increment value passed to this component.
   * the decrease will not be lower than the min value passed to the component.
   * This then emits the changeValue method that is bound to the compnent.
   * @memberof MminputComponent
   */
  decrementValue() {
    if ( this.inputValue > this.min) {
      this.changeValue.emit(-this.increment);
    }
  }

  writeConole() {
  }

}
