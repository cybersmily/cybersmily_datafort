import { CpRedWoundsManagerService } from './../../services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';
import { CpRedCharacterCriticalInjury } from '../../models';

@Component({
    selector: 'cs-cp-red-injuries-display',
    templateUrl: './cp-red-injuries-display.component.html',
    styleUrls: ['./cp-red-injuries-display.component.css'],
    standalone: false
})
export class CpRedInjuriesDisplayComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  isCollapsed = false;

  newInjury: CpRedCharacterCriticalInjury = new CpRedCharacterCriticalInjury();
  selectedIndex: number = -1;

  @Input()
  criticalInjuries: Array<CpRedCharacterCriticalInjury>;

  currInjuries: Array<CpRedCharacterCriticalInjury>;

  constructor(private woundManager: CpRedWoundsManagerService) {}

  ngOnInit(): void {
    this.currInjuries =
      this.criticalInjuries?.map(
        (injury) => new CpRedCharacterCriticalInjury(injury)
      ) ?? new Array<CpRedCharacterCriticalInjury>();
  }

  add(injury: CpRedCharacterCriticalInjury): void {
    this.woundManager.addCriticalInjury(
      new CpRedCharacterCriticalInjury(injury)
    );
    this.newInjury = new CpRedCharacterCriticalInjury();
  }

  delete(injury: CpRedCharacterCriticalInjury): void {
    this.woundManager.removeCriticalInjury(injury);
    this.selectedIndex = -1;
  }

  toggleEdit(index: number): void {
    this.selectedIndex = index === this.selectedIndex ? -1 : index;
  }

  update(param: {
    injuryName: string;
    injury: CpRedCharacterCriticalInjury;
  }): void {
    this.woundManager.updateCriticalInjury(param.injuryName, param.injury);
    this.selectedIndex = -1;
  }
}
