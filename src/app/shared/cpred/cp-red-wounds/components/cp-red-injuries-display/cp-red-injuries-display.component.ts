import {
  faChevronDown,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-injuries-display',
  templateUrl: './cp-red-injuries-display.component.html',
  styleUrls: ['./cp-red-injuries-display.component.css'],
})
export class CpRedInjuriesDisplayComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}
}
