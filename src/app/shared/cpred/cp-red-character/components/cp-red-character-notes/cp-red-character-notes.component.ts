import { Component, OnInit, HostListener } from '@angular/core';
import {
  faChevronDown,
  faChevronRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp-red-character-notes',
  templateUrl: './cp-red-character-notes.component.html',
  styleUrls: ['./cp-red-character-notes.component.css'],
})
export class CpRedCharacterNotesComponent implements OnInit {
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
