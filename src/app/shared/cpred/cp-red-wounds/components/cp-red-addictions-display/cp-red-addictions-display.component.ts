import {
  faChevronDown,
  faChevronRight,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-addictions-display',
  templateUrl: './cp-red-addictions-display.component.html',
  styleUrls: ['./cp-red-addictions-display.component.css'],
})
export class CpRedAddictionsDisplayComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}
}
