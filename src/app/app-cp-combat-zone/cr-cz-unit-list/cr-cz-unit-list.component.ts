import { Component, Input } from '@angular/core';
import { CrCzUnitDataService } from '../services/cr-cz-unit-data/cr-cz-unit-data.service';
import { take, Observable } from 'rxjs';
import { iCrCzUnitCardData } from '../models/cr-cz-unit-card';
import {faPlus,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { CrCzArmyBuilderService } from '../services/cr-cz-army-builder/cr-cz-army-builder.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'cs-cr-cz-unit-list',
  templateUrl: './cr-cz-unit-list.component.html',
  styleUrls: ['./cr-cz-unit-list.component.css']
})
export class CrCzUnitListComponent {

  faStar = faStar;
  faPlus = faPlus;
  searchName: string = '';
  filterFaction: string = '';
  searchKeywords: string = '';

  dataList$: Observable<Array<iCrCzUnitCardData>>;

  @Input()
  faction: string = '';

  @Input()
  squadIndex: number = 0;

  constructor(private unitDataService: CrCzUnitDataService, private armyBuilder: CrCzArmyBuilderService){}

  ngOnInit() {
    this.dataList$ = this.unitDataService.unitList;
    this.filterFaction = this.faction;
  }

  add(faction: string, name: string, rank: number) {
    this.dataList$.pipe(take(1)).subscribe( (data:any) => {
      let found = data.find(unit => unit.faction === faction && unit.name === name);
      this.armyBuilder.addUnit(this.squadIndex, found, rank);
    });
  }

  hasUnit(name: string, streetcred: number): boolean {
    return this.armyBuilder.hasUnit(this.squadIndex, name, streetcred);
  }

  countOfUnit(name: string, streetcred:number): number {
    return this.armyBuilder.countOfUnit(this.squadIndex, name, streetcred);
  }

  setFaction(faction: string): void {
    this.filterFaction = faction;
  }

}
