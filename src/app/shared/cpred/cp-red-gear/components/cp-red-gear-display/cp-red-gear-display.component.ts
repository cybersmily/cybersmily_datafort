import { Component, OnInit, HostListener } from '@angular/core';
import {
  faChevronDown,
  faChevronRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'cs-cp-red-gear-display',
    templateUrl: './cp-red-gear-display.component.html',
    styleUrls: ['./cp-red-gear-display.component.css'],
    standalone: false
})
export class CpRedGearDisplayComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faPlus = faPlus;

  isCollapsed = false;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  resizeWindow() {
    this.isCollapsed = window.innerWidth < 768;
  }
}
