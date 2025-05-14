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
  searchFilter: Array<string>;
  streetCredFilter: Array<number> = [0,1,2,10];
  showSelected: boolean = true;

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

  get hasLeader(): boolean {
    return this.armyBuilder.hasLeader(this.squadIndex);
  }

  add(name: string, rank: number) {
    this.dataList$.pipe(take(1)).subscribe( (data:any) => {
      let found = data.find(unit => unit.name === name);
      this.armyBuilder.addUnit(this.squadIndex, found, rank);
    });
  }

  hasSpecialist(name: string): boolean {
    return this.armyBuilder.hasSpecialist(this.squadIndex, name);
  }

  hasUnit(name: string, streetcred: number): boolean {
    return this.armyBuilder.hasUnit(this.squadIndex, name, streetcred);
  }

  isLeader(keywords:Array<string>): boolean {
    return keywords?.includes('leader');
  }


  countOfUnit(name: string, streetcred:number): number {
    return this.armyBuilder.countOfUnit(this.squadIndex, name, streetcred);
  }

  setFaction(faction: string): void {
    this.filterFaction = faction;
  }

  toggleCredFilter(value: number): void {
    if(!this.streetCredFilter.includes(value)) {
      this.streetCredFilter.push(value);
    } else {
      const index = this.streetCredFilter.indexOf(value);
      this.streetCredFilter.splice(index, 1);
    }
  }

  showBorder(unit:iCrCzUnitCardData): boolean {
    if(this.streetCredFilter.length < 2) {
      return false;
    }
    let show = false;
    this.streetCredFilter.filter(cred => cred !== 10).forEach( cred => {
      show = show || unit.ranks.some(rank => rank.cred === cred);
    });
    return show;
  }

  disabledMessage(unitKeywords: Array<string>, unitName: string): string {
    if(!this.hasLeader && !this.isLeader(unitKeywords) && !this.hasSpecialist(unitName) ) {
      return '';
    }
    let message = '';
    message += (this.hasLeader && this.isLeader(unitKeywords)) ? 'The team already has a leader' : '';
    message += (this.hasSpecialist(unitName)) ? 'The team already has this specialist' : '';
    return message;
  }

}
