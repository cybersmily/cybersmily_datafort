import { HotStuffArea } from './../../models/hot-stuff-area';
import {
  faPlus,
  faDice,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Component, input, OnInit, output } from '@angular/core';

@Component({
    selector: 'cs-cp2020-hot-stuff-contact-new',
    templateUrl: './cp2020-hot-stuff-contact-new.component.html',
    styleUrls: ['./cp2020-hot-stuff-contact-new.component.css'],
    standalone: false
})
export class Cp2020HotStuffContactNewComponent {
  faPlus = faPlus;
  faDice = faDice;
  faSave = faSave;
  faTimes = faTimes;

  isEdit = false;
  isUnderPoints = false;
  canAdd = true;

  maxPoints = input<number>(0);
  add = output<HotStuffArea>();

  newArea: HotStuffArea = new HotStuffArea();

  get maxRolls(): number {
    if (this.maxPoints() >= 4 && this.maxPoints() < 8) {
      return 1;
    }
    if (this.maxPoints() >= 8 && this.maxPoints() < 16) {
      return 2;
    }
    if (this.maxPoints() >= 16 && this.maxPoints() < 32) {
      return 3;
    }
    if (this.maxPoints() >= 32 && this.maxPoints() < 64) {
      return 4;
    }
    if (this.maxPoints() >= 64 && this.maxPoints() < 101) {
      return 5;
    }
    return 0;
  }

  constructor() {}

  addArea(): void {
    const newItem = new HotStuffArea(this.newArea);
    this.newArea = new HotStuffArea();
    this.add.emit(newItem);
  }
}
