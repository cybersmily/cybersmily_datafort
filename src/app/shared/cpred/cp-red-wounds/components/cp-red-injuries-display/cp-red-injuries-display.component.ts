import {
  faChevronDown,
  faChevronRight,
  faTimes,
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
  faTimes = faTimes;
  faPlus = faPlus;
  faTrash = faTrash;

  @Input()
  criticalInjuries: Array<CpRedCharacterCriticalInjury>;

  @Output()
  updateInjuries: EventEmitter<Array<CpRedCharacterCriticalInjury>> =
    new EventEmitter<Array<CpRedCharacterCriticalInjury>>();

  constructor() {}

  ngOnInit(): void {}
}
