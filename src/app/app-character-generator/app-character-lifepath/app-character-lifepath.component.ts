import { LifePathGeneratorService, SourcesDataService } from './../../shared/cp2020/cp2020-lifepath/services';
import { TitleValue } from './../../shared/models/title-value';
import { Sibling, LifePathResults, LifepathEvent } from '../../shared/cp2020/cp2020-lifepath/models';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { faMars, faVenus, faDice, faPlus, faGenderless, faTrash, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-app-character-lifepath',
  templateUrl: './app-character-lifepath.component.html',
  styleUrls: ['./app-character-lifepath.component.css']
})
export class AppCharacterLifepathComponent implements OnInit, OnChanges {
  faMars = faMars;
  faVenus = faVenus;
  faGenderless= faGenderless;
  faDice = faDice;
  faPlus = faPlus;
  faTrash = faTrash;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  get collapseChevron():any {
    return (this.isCollapsed) ? this.faChevronRight : this.faChevronDown;
  }

  sources = new Array<TitleValue>();
  selectedSource = 'CP2020';
  years = 0;
  eventful = false;

  newLifPath: LifePathResults;

  @Input()
  lifepath = new LifePathResults();

  @Input()
  showDice = true;

  @Input()
  showSources = true;

  @Input()
  showAlwaysEvents = true;

  @Input()
  showYears = true;

  @Input()
  source: string = 'CP2020';

  @Input()
  isAlwaysEventful: boolean = false;

  @Input()
  eventYears: number = 0;

  @Input()
  isCollapsed = false;

  @Output()
  changeLifepath = new EventEmitter<LifePathResults>();

  constructor( private sourceService: SourcesDataService,
    private lifepathGenerator: LifePathGeneratorService
    ) { }

  ngOnInit() {
    this.newLifPath = new LifePathResults(this.lifepath);
    this.sourceService
    .getSources()
    .subscribe( sources => {
      this.sources = sources;
      this.years = this.eventYears;
      this.selectedSource = this.source;
    });
  }

  ngOnChanges() {
    this.newLifPath = new LifePathResults(this.lifepath);
  }

  get siblings(): Array<Sibling> {
    if ( this.lifepath && this.lifepath.family.siblings) {
      return this.newLifPath.family.siblings.siblings.sort( (a, b) => a.age.localeCompare(b.age));
    }
    return new Array<Sibling>();
  }

  get sibs(): number {
    return this.newLifPath.family.siblings.getSibCount();
  }

  get brothers(): number {
    return this.newLifPath.family.siblings.getBrothersCount();
  }

  get sisters(): number {
    return this.newLifPath.family.siblings.getSistersCount();
  }

  onChangeLifePath() {
    this.changeLifepath.emit(this.newLifPath);
  }

  roll() {
    this.newLifPath = new LifePathResults();
    this.lifepathGenerator
    .generateLifePath(this.selectedSource, this.eventful, this.years.toString())
    .subscribe( lifepath => {
      this.newLifPath = lifepath;
    });
  }

  addSibling() {
    const sibling = new Sibling();
    this.newLifPath.family.siblings.siblings.push(sibling);
    this.changeLifepath.emit(this.newLifPath);
  }

  removeSibling(index: number) {
    this.newLifPath.family.siblings.siblings.splice(index, 1);
    this.changeLifepath.emit(this.newLifPath);
  }

  changeYear() {
    if ( this.years > 12) {
      this.years = 12;
    }
  }

  addYear() {
    const year: LifepathEvent = {age: 0, event: ''};
    this.newLifPath.events.push(year);
    this.changeLifepath.emit(this.newLifPath);
  }

  removeYear(index: number) {
    this.newLifPath.events.splice(index, 1);
    this.changeLifepath.emit(this.newLifPath);
  }
}
