import { Component, OnInit, Input } from '@angular/core';
import { Cp2020ArmorPiece } from '../models';

@Component({
  selector: 'cs-cp2020-clothing-list',
  templateUrl: './cp2020-clothing-list.component.html',
  styleUrls: ['./cp2020-clothing-list.component.css']
})
export class Cp2020ClothingListComponent implements OnInit {

  @Input()
  clothingList: Cp2020ArmorPiece[];

  @Input()
  totalCost: number;

  constructor() {
    this.clothingList = new Array();
    this.totalCost = 0;
   }

  ngOnInit() {
  }

}
