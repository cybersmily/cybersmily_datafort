import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cp2020Housing } from '../models';

@Component({
  selector: 'cs-cp2020-housing-list',
  templateUrl: './cp2020-housing-list.component.html',
  styleUrls: ['./cp2020-housing-list.component.css']
})
export class Cp2020HousingListComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  @Input()
  housingList: Array<Cp2020Housing> = new Array<Cp2020Housing>();

  @Output()
  updateHousing: EventEmitter<Array<Cp2020Housing>> = new EventEmitter<Array<Cp2020Housing>>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.housingList);
  }

}
