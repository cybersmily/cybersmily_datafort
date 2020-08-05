import { faPlus, faDice, faTrash} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-gear',
  templateUrl: './cmbt-trck-gear.component.html',
  styleUrls: ['./cmbt-trck-gear.component.css']
})
export class CmbtTrckGearComponent implements OnInit {
  faDice = faDice;
  faTrash = faTrash;
  faPlus = faPlus;

  @Input()
  gear = new Array<string>();

  @Output()
  newGear = new EventEmitter<Array<string>>();

  addedGear = '';

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.gear.push(this.addedGear);
    this.addedGear = '';
    this.newGear.emit(this.gear);
  }

  delete(index: number) {
    this.gear.splice(index, 1);
    this.newGear.emit(this.gear);
  }
}
