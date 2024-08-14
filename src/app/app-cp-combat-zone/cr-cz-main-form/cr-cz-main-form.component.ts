import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cr-cz-main-form',
  templateUrl: './cr-cz-main-form.component.html',
  styleUrls: ['./cr-cz-main-form.component.css']
})
export class CrCzMainFormComponent implements OnInit {
  showUnitList: boolean = true;
  showGearList: boolean = false;
  showProgramsList: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  toggle(tab: string): void {
    this.showUnitList = (tab === "units");
    this.showGearList = (tab === "gear");
    this.showProgramsList = (tab === "programs");
  }

}
