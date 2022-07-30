import { Component, OnInit, HostListener } from '@angular/core';
import {
  faChevronDown,
  faChevronRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp-red-cyberware-display',
  templateUrl: './cp-red-cyberware-display.component.html',
  styleUrls: ['./cp-red-cyberware-display.component.css'],
})
export class CpRedCyberwareDisplayComponent implements OnInit {
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
