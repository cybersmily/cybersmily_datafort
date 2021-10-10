import { MaxMetalWeaponCategory } from './../../shared/cp2020/cp2020weapons/models';
import { MaxMetalDataService } from '../../shared/cp2020/cp2020-vehicles/services';
import { Component, OnInit } from '@angular/core';
import {faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { MaxMetalOption } from '../../shared/cp2020/cp2020-vehicles/models';

@Component({
  selector: 'cs-mmaccessories',
  templateUrl: './mmaccessories.component.html',
  styleUrls: ['./mmaccessories.component.css']
})
export class MmaccessoriesComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  weapons: Array<MaxMetalWeaponCategory>;
  options: Array<MaxMetalOption>;
  optionHeader: {name: string, spaces: string, mass: string, cost: string };
  constructor(private mmDataService: MaxMetalDataService) { }

  ngOnInit() {
    this.mmDataService.loadOptions().subscribe(options => this.options = options);
    this.mmDataService.loadWeapons().subscribe(weapons => this.weapons = weapons);
    this.optionHeader = {name: 'name', spaces: 'spaces', mass: 'mass', cost: 'cost' };
  }

}
