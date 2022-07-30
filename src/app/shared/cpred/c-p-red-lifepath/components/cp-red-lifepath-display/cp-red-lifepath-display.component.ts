import { Component, OnInit, HostListener } from '@angular/core';
import {
  faChevronDown,
  faChevronRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'cs-cp-red-lifepath-display',
  templateUrl: './cp-red-lifepath-display.component.html',
  styleUrls: ['./cp-red-lifepath-display.component.css'],
})
export class CpRedLifepathDisplayComponent implements OnInit {
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
