import {
  faPen,
  faTrash,
  faSave,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { HotStuffArea } from './../../models';
import { Component, OnInit, output, input } from '@angular/core';

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

  area = input<HotStuffArea>(new HotStuffArea());
  index = input<number>(0);

  delete = output<number>();
  edit = output<{ area: HotStuffArea; index: number }>();

  editMode = false;
  isCollapse = true;

  constructor() {}

  ngOnInit() {}

  onDelete() {
    this.delete.emit(this.index());
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;
    this.edit.emit({ area: this.area(), index: this.index() });
  }
}
