import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-armor-display',
  templateUrl: './cp-red-armor-display.component.html',
  styleUrls: ['./cp-red-armor-display.component.css'],
})
export class CpRedArmorDisplayComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  isCollapsed = false;

  constructor() {}

  ngOnInit(): void {}
}
