import { faPen, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { HotStuffArea } from './../../shared/models/fixer/hot-stuff-area';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-fixer-calc-hot-stuff-area',
  templateUrl: './fixer-calc-hot-stuff-area.component.html',
  styleUrls: ['./fixer-calc-hot-stuff-area.component.css']
})
export class FixerCalcHotStuffAreaComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faSave = faSave;

  editMode = false;

  @Input()
  area: HotStuffArea = new HotStuffArea();

  @Input()
  index = 0;

  @Output()
  delete = new EventEmitter<number>();

  @Output()
  edit = new EventEmitter<HotStuffArea>();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.delete.emit(this.index);
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;
    this.edit.emit(this.area);
  }

}
