import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-cr-cz-main-form',
    templateUrl: './cr-cz-main-form.component.html',
    styleUrls: ['./cr-cz-main-form.component.css'],
    standalone: false
})
export class CrCzMainFormComponent {
  showUnitList: boolean = true;
  showGearList: boolean = false;
  showProgramsList: boolean = false;

  toggle(tab: string): void {
    this.showUnitList = (tab === "units");
    this.showGearList = (tab === "gear");
    this.showProgramsList = (tab === "programs");
  }

}
