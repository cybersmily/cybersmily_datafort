import { MaxMetalDataService } from './../../shared/services/maxmetal';
import { Component, OnInit } from '@angular/core';
import {faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-mmaccessories',
  templateUrl: './mmaccessories.component.html',
  styleUrls: ['./mmaccessories.component.css']
})
export class MmaccessoriesComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  weapons: any[];
  options: any[];
  optionHeader: {name: string, spaces: string, mass: string, cost: string };
  constructor(private mmDataService: MaxMetalDataService) { }

  ngOnInit() {
    this.mmDataService.LoadOptions().subscribe(options => this.options = options);
    this.mmDataService.LoadWeapons().subscribe(weapons => this.weapons = weapons);
    this.optionHeader = {name: 'name', spaces: 'spaces', mass: 'mass', cost: 'cost' };
  }

}
