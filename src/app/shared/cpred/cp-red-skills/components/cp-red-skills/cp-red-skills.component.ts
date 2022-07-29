import {
  faFilter,
  faSearch,
  faSort,
  faTimes,
  faPlus,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { CpRedSkillManagerService } from './../../services/cp-red-skill-manager/cp-red-skill-manager.service';
import { Component, OnInit } from '@angular/core';
import { CpRedCharacterSkill } from '../../models';

@Component({
  selector: 'cs-cp-red-skills',
  templateUrl: './cp-red-skills.component.html',
  styleUrls: ['./cp-red-skills.component.css'],
})
export class CpRedSkillsComponent implements OnInit {
  faSearch = faSearch;
  faFilter = faFilter;
  faSort = faSort;
  faTimes = faTimes;
  faPlus = faPlus;
  faSave = faSave;

  skills$: Observable<Array<CpRedCharacterSkill>>;

  newSkill: CpRedCharacterSkill = new CpRedCharacterSkill();

  sortOn: string = 'name';
  sortDirection: boolean = false;
  searchText: string = '';
  forceNameSort: string = 'name';
  groupBy: string = '';
  filterOn: string;

  constructor(private skillManager: CpRedSkillManagerService) {}

  ngOnInit(): void {
    this.skills$ = this.skillManager.skills;
  }
  groupSortOn(filter: string): void {
    this.skills$ = this.skillManager.skills;
    switch (filter) {
      case 'stat':
        this.sortOn = filter;
        this.groupBy = filter;
        this.sortDirection = false;
        this.filterOn = null;
        this.forceNameSort = 'name';
        break;
      case 'type':
        this.sortOn = filter;
        this.groupBy = filter;
        this.sortDirection = false;
        this.filterOn = null;
        this.forceNameSort = 'name';
        break;
      case 'level':
        this.sortOn = 'name';
        this.groupBy = '';
        this.sortDirection = false;
        this.filterOn = 'base';
        this.forceNameSort = 'name';
        break;
      default:
        this.sortOn = 'name';
        this.groupBy = '';
        this.sortDirection = false;
        this.filterOn = null;
        this.forceNameSort = 'name';
    }
  }
}
