import {
  faFilter,
  faSearch,
  faSort,
  faTimes,
  faPlus,
  faSave,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { CpRedSkillManagerService } from './../../services/cp-red-skill-manager/cp-red-skill-manager.service';
import { Component, OnInit, HostListener } from '@angular/core';
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
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  skills$: Observable<Array<CpRedCharacterSkill>>;

  newSkill: CpRedCharacterSkill = new CpRedCharacterSkill();

  sortOn: string = 'name';
  sortDirection: boolean = false;
  searchText: string = '';
  groupBy: string = '';
  filterOn: string;
  isCollapsed: boolean = false;

  constructor(private skillManager: CpRedSkillManagerService) {}

  ngOnInit(): void {
    this.skills$ = this.skillManager.skills;
  }

  @HostListener('window:resize', ['$event'])
  resizeWindow() {
    this.isCollapsed = window.innerWidth < 768;
  }

  updateNewSkill(skill: CpRedCharacterSkill): void {
    this.newSkill = new CpRedCharacterSkill(skill);
  }

  saveNewSkill(): void {
    this.skillManager.addSkill(new CpRedCharacterSkill(this.newSkill));
  }

  get enableNewSkillSave(): boolean {
    return (
      this.newSkill.name !== '' &&
      this.newSkill.stat !== '' &&
      this.newSkill.type !== ''
    );
  }

  groupSortOn(filter: string): void {
    this.skills$ = this.skillManager.skills;
    switch (filter) {
      case 'stat':
        this.sortOn = filter;
        this.groupBy = filter;
        this.sortDirection = false;
        this.filterOn = null;
        break;
      case 'type':
        this.sortOn = filter;
        this.groupBy = filter;
        this.sortDirection = false;
        this.filterOn = null;
        break;
      case 'level':
        this.sortOn = 'name';
        this.groupBy = '';
        this.sortDirection = false;
        this.filterOn = 'base';
        break;
      default:
        this.sortOn = 'name';
        this.groupBy = '';
        this.sortDirection = false;
        this.filterOn = null;
    }
  }
}
