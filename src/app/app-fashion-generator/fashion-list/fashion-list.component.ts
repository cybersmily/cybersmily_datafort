import { Component, OnInit, Input } from '@angular/core';
import { Clothing } from '../../shared/models/clothing/clothing';

@Component({
  selector: 'cs-fashion-list',
  templateUrl: './fashion-list.component.html',
  styleUrls: ['./fashion-list.component.css']
})
export class FashionListComponent implements OnInit {

  @Input()
  clothingList: Clothing[];

  @Input()
  totalCost: number;

  constructor() {
    this.clothingList = new Array();
    this.totalCost = 0;
   }

  ngOnInit() {
  }

}
