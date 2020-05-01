import { MaxMetalWeaponMount } from '../../shared/models/weapon';
import { Component, OnInit, Input } from '@angular/core';
import {faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-mmmount',
  templateUrl: './mmmount.component.html',
  styleUrls: ['./mmmount.component.css']
})
export class MmmountComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  @Input()
  mount: MaxMetalWeaponMount;
  isCollapse: boolean;

  constructor() { }

  ngOnInit() {
    this.isCollapse = true;
    if (!(this.mount)) {
      this.mount = {name: '', description: '', availability: '', cost: '', wa: '', spaces: 0, spacelimit: '0'};
    }
  }

}
