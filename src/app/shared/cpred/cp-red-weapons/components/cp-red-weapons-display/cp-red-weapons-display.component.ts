import {
  faChevronDown,
  faChevronRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-cp-red-weapons-display',
    templateUrl: './cp-red-weapons-display.component.html',
    styleUrls: ['./cp-red-weapons-display.component.css'],
    standalone: false
})
export class CpRedWeaponsDisplayComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faPlus = faPlus;

  isCollapsed = false;

  constructor() {}

  ngOnInit(): void {}
}
