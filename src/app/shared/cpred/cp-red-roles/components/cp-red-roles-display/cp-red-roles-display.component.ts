import {
  faChevronDown,
  faChevronRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'cs-cp-red-roles-display',
  templateUrl: './cp-red-roles-display.component.html',
  styleUrls: ['./cp-red-roles-display.component.css'],
})
export class CpRedRolesDisplayComponent implements OnInit {
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
