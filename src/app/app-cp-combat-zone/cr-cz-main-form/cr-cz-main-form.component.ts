import { Component, OnInit } from '@angular/core';
import { CrCzArmyBuilderService } from '../services/cr-cz-army-builder/cr-cz-army-builder.service';
import { Observable } from 'rxjs';
import { iCrCzSquad } from '../models/cr-cz-squad';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cr-cz-main-form',
  templateUrl: './cr-cz-main-form.component.html',
  styleUrl: './cr-cz-main-form.component.css'
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
