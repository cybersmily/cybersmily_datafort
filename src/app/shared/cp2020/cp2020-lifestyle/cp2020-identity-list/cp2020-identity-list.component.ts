import { faPlus, faTrash, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Cp2020Identity } from '../models/cp2020-identity';

@Component({
    selector: 'cs-cp2020-identity-list',
    templateUrl: './cp2020-identity-list.component.html',
    styleUrls: ['./cp2020-identity-list.component.css'],
    standalone: false
})
export class Cp2020IdentityListComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
  faSave = faSave;
  editIndex = -1;

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

  getId(index: number, col: number): number {
    index = col < 2 ? index : index + this.nextColIndex;
    return index;
  }

  get nextColIndex(): number {
    return Math.ceil(this.idList.length/2);
  }

  get firstColumn(): Array<Cp2020Identity> {
    const i = this.nextColIndex;
    return this.idList.slice(0,i);
  }

  get secondColumn(): Array<Cp2020Identity> {
    const i = this.nextColIndex;
    return this.idList.slice(i);
  }

  add() {
    const id = this.idList.length;
    this.idList.push({name: ``, sin: '', desc: ''});
    this.updateList.emit(this.idList);
  }

  update(id: Cp2020Identity, index: number) {
    this.idList[index] = id;
    this.updateList.emit(this.idList);
  }

  delete(index: number) {
    this.idList.splice(index, 1);
    this.updateList.emit(this.idList);
  }

  edit(index: number) {
    this.editIndex = index;
  }

}
