import { Cp2020Utility } from './../models/cp2020-utility';
import { faTrash, faPlus, faPen, faList } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp2020-service-list',
  templateUrl: './cp2020-service-list.component.html',
  styleUrls: ['./cp2020-service-list.component.css']
})
export class Cp2020ServiceListComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  faPen = faPen;
  faList = faList;

  @Input()
  utilityList: Array<Cp2020Utility> = new Array<Cp2020Utility>();

  constructor() { }

  ngOnInit(): void {
  }

}
