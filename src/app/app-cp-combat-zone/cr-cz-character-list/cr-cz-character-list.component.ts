import { Component, input, Input } from '@angular/core';
import { CrCzUnitDataService } from '../services/cr-cz-unit-data/cr-cz-unit-data.service';
import { take, Observable } from 'rxjs';
import { iCrCzCharacterCardData } from '../models/cr-cz-character-card';
import {faBookBookmark, faPlus,
  faStar,
  faUsers,
  faUsersSlash
} from '@fortawesome/free-solid-svg-icons';
import { CrCzArmyBuilderService } from '../services/cr-cz-army-builder/cr-cz-army-builder.service';
import { KeyValue } from '@angular/common';
import { CrCzReleasesDataService } from '../services/cr-cz-releases-data/cr-cz-releases-data.service';

@Component({
    selector: 'cs-cr-cz-character-list',
    templateUrl: './cr-cz-character-list.component.html',
    styleUrls: ['./cr-cz-character-list.component.css'],
    standalone: false
})
export class CrCzCharacterListComponent {

  faStar = faStar;
  faPlus = faPlus;
  faUsers = faUsers;
  faUsersSlash = faUsersSlash;
  faBookBookmark = faBookBookmark;

  faction = input<string>();
  squadIndex = input<number>(0);

  searchName: string = '';
  filterFaction: string = '';
  searchKeywords: string = '';
  searchFilter: Array<string>;
  releaseFilter: Array<string>;
  streetCredFilter: Array<number> = [0,1,2,10];
  skillFilter: Array<string> = [];
  showSelected: boolean = true;

  dataList$: Observable<Array<iCrCzCharacterCardData>>;
  releaseList$: Observable<Array<string>>;


  constructor(private unitDataService: CrCzUnitDataService, private armyBuilder: CrCzArmyBuilderService, private releaseListService: CrCzReleasesDataService){}

  ngOnInit() {
    this.dataList$ = this.unitDataService.unitList;
    this.filterFaction = this.faction();
  }

  get hasLeader(): boolean {
    return this.armyBuilder.hasLeader(this.squadIndex());
  }

  add(name: string, rank: number) {
    this.dataList$.pipe(take(1)).subscribe( (data:any) => {
      let found = data.find(unit => unit.name === name);
      this.armyBuilder.addUnit(this.squadIndex(), found, rank);
    });
  }

  hasSpecialist(name: string): boolean {
    return this.armyBuilder.hasSpecialist(this.squadIndex(), name);
  }

  hasUnit(name: string, streetcred: number): boolean {
    return this.armyBuilder.hasUnit(this.squadIndex(), name, streetcred);
  }

  isLeader(keywords:Array<string>): boolean {
    return keywords?.includes('leader');
  }


  countOfUnit(name: string, streetcred:number): number {
    return this.armyBuilder.countOfUnit(this.squadIndex(), name, streetcred);
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

  showUnit(unit:iCrCzCharacterCardData): boolean {
    if(this.streetCredFilter.length < 2 || this.skillFilter.length > 3) {
      return false;
    }
    let show = false;
    this.streetCredFilter.filter(cred => cred !== 10).forEach( cred => {
      show = show || unit.ranks.some(rank => rank.cred === cred);
    });
    this.skillFilter.forEach( skill => {
      show = show && unit.ranks.some( rank => rank[skill] > 0);
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

  toggleSkill(skill:string): void {
    if(this.skillFilter.includes(skill)) {
      this.skillFilter.splice(this.skillFilter.indexOf(skill), 1);
    } else {
      this.skillFilter.push(skill);
    }
  }

  filterOnRelease(event: Array<string>): void {
    this.releaseFilter = [...event];
  }

}
