import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Cp2020Identity } from '../models/cp2020-identity';

@Component({
  selector: 'cs-cp2020-identity-list',
  templateUrl: './cp2020-identity-list.component.html',
  styleUrls: ['./cp2020-identity-list.component.css']
})
export class Cp2020IdentityListComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faTrash = faTrash;

  @Input()
  identityList: Array<Cp2020Identity> = new Array<Cp2020Identity>();

  idList: Array<Cp2020Identity> = new Array<Cp2020Identity>();

  @Output()
  updateList: EventEmitter<Array<Cp2020Identity>> = new EventEmitter<Array<Cp2020Identity>>();

  constructor() { }

  ngOnInit(): void {
    this.idList = JSON.parse(JSON.stringify(this.identityList));
  }
  ngOnChanges(): void {
    this.idList = JSON.parse(JSON.stringify(this.identityList));
  }


  get firstColumn(): Array<Cp2020Identity> {
    const i = Math.ceil(this.idList.length/2);
    return this.idList.slice(0,i);
  }

  get secondColumn(): Array<Cp2020Identity> {
    const i = Math.ceil(this.idList.length/2);
    return this.idList.slice(i);
  }

  add() {
    this.idList.push({name: '', sin: '', desc: ''});
    this.updateList.emit(this.idList);
  }

  update(id: Cp2020Identity, index: number, col: number) {
    index = col < 2 ? index : index + Math.ceil(this.idList.length/2);
    this.idList[index] = id;
    this.updateList.emit(this.idList);
  }

  delete(index: number, col: number) {
    index = col < 2 ? index : index + Math.ceil(this.idList.length/2);
    this.idList.splice(index, 1);
    this.updateList.emit(this.idList);
  }

}
