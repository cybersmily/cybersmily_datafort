import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cp2020ArmorPiece } from '../models';

@Component({
  selector: 'cs-cp2020-clothing-list',
  templateUrl: './cp2020-clothing-list.component.html',
  styleUrls: ['./cp2020-clothing-list.component.css']
})
export class Cp2020ClothingListComponent implements OnInit {

  currList = new Array<Cp2020ArmorPiece>();

  @Input()
  armorList = new Array<Cp2020ArmorPiece>();

  @Output()
  change = new EventEmitter<Array<Cp2020ArmorPiece>>();

  get totalCost(): number {
    return this.armorList.reduce( (a, b) => a + b.cost, 0);
  }

  constructor() {}

  ngOnInit() {
    this.currList = this.armorList
      .map(armor => armor)
      .sort( (a, b) => a.name.localeCompare(b.name));
  }

  delete(index: number) {
    this.currList.splice(index, 1);
    this.update();
  }

  update() {
    this.change.emit(this.currList);
  }

}
