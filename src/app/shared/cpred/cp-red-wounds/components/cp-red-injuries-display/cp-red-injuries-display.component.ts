import { CpRedWoundsManagerService } from './../../services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import {
  faChevronDown,
  faChevronRight,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CpRedCharacterCriticalInjury } from '../../models';

@Component({
  selector: 'cs-cp-red-injuries-display',
  templateUrl: './cp-red-injuries-display.component.html',
  styleUrls: ['./cp-red-injuries-display.component.css'],
})
export class CpRedInjuriesDisplayComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;

  isCollapsed = false;

  newInjury: CpRedCharacterCriticalInjury = new CpRedCharacterCriticalInjury();
  selectedIndex: number = -1;

  @Input()
  criticalInjuries: Array<CpRedCharacterCriticalInjury>;
  currInjuries: Array<CpRedCharacterCriticalInjury> =
    new Array<CpRedCharacterCriticalInjury>();

  constructor(private woundManager: CpRedWoundsManagerService) {}

  ngOnInit(): void {
    this.currInjuries = this.criticalInjuries.map(
      (injury) => new CpRedCharacterCriticalInjury(injury)
    );
  }

  /**
   * Only enable adding if the name is not blank and doesn't already exist.
   *
   * @readonly
   * @type {boolean}
   * @memberof CpRedInjuriesDisplayComponent
   */
  get isAddDisabled(): boolean {
    return (
      this.newInjury.name === '' ||
      this.currInjuries.some(
        (inj) => inj.name.toLowerCase() === this.newInjury.name.toLowerCase()
      )
    );
  }

  add(): void {
    this.woundManager.addCriticalInjury(
      new CpRedCharacterCriticalInjury(this.newInjury)
    );
    this.newInjury = new CpRedCharacterCriticalInjury();
  }

  delete(injury: CpRedCharacterCriticalInjury): void {
    this.woundManager.removeCriticalInjury(injury);
  }

  toggleEdit(index: number): void {
    this.selectedIndex = index === this.selectedIndex ? -1 : index;
  }

  update(injury): void {
    this.woundManager.removeCriticalInjury(injury);
  }
}
