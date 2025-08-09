import {
  faPen,
  faTrash,
  faSave,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { HotStuffArea } from './../../models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-cp2020-hot-stuff-contact',
    templateUrl: './cp2020-hot-stuff-contact.component.html',
    styleUrls: ['./cp2020-hot-stuff-contact.component.css'],
    standalone: false
})
export class Cp2020HotStuffContactComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faSave = faSave;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  editMode = false;
  isCollapse = true;

  @Input()
  area: HotStuffArea = new HotStuffArea();

  @Input()
  index = 0;

  @Output()
  delete = new EventEmitter<number>();

  @Output()
  edit = new EventEmitter<{ area: HotStuffArea; index: number }>();

  constructor() {}

  ngOnInit() {}

  onDelete() {
    this.delete.emit(this.index);
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;
    this.edit.emit({ area: this.area, index: this.index });
  }
}
