import { Cp2020ArmorPiece } from './../models/cp2020-armor-piece';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp2020-armor-clothing-list',
  templateUrl: './cp2020-armor-clothing-list.component.html',
  styleUrls: ['./cp2020-armor-clothing-list.component.css']
})
export class Cp2020ArmorClothingListComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;

  @Input()
  clothingList = new Array<Cp2020ArmorPiece>();

  constructor() { }

  ngOnInit(): void {
  }

}
