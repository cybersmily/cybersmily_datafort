import { PieceOfClothing } from '../../shared/models/clothing';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Clothing } from '../../shared/models/clothing';

@Component({
  selector: 'cs-fashion-clothes-selector',
  templateUrl: './fashion-clothes-selector.component.html',
  styleUrls: ['./fashion-clothes-selector.component.css']
})
export class FashionClothesSelectorComponent implements OnInit {

  @Input()
  clothing: PieceOfClothing[];

  currSelection: PieceOfClothing;
  isLeather: boolean;

  @Output()
  selectClothing: EventEmitter<PieceOfClothing> = new EventEmitter<PieceOfClothing>();
  @Output()
  selectLeather: EventEmitter<Boolean> = new EventEmitter<Boolean>();


  constructor() { }

  ngOnInit() {
    this.clothing = new Array();
    this.currSelection = { name: '', cost: 0.0, wt: '', loc: ''};
  }

  /**
   * Some clothing can be made of leather and will have different modifier
   * if it is.
   * @returns {boolean} = if the clothing can be leather.
   * @memberof FashionInputComponent
   */
  availableAsLeather(): boolean {
    return (typeof this.currSelection.leather !== 'undefined');
  }

  checkedLeather(event) {
    this.selectLeather.emit(this.isLeather);
  }

  changeClothing(event: any) {
    this.selectClothing.emit(this.currSelection);
  }

}
