import { Component, Input, OnInit } from '@angular/core';
import { faDice, faPlus, faTrash, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp2020-armor-section',
  templateUrl: './cp2020-armor-section.component.html',
  styleUrls: ['./cp2020-armor-section.component.css']
})
export class Cp2020ArmorSectionComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  faTrash = faTrash;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  get collapseChevron():any {
    return (this.isCollapsed) ? this.faChevronRight : this.faChevronDown;
  }

  @Input()
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
