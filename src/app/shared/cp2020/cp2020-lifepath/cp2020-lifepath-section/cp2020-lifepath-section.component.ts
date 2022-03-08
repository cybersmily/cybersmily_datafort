import { LifePathGeneratorService, SourcesDataService } from './../services';
import { TitleValue } from './../../../models/title-value';
import { Sibling, LifePathResults, LifepathEvent } from './../models';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { faMars, faVenus, faDice, faPlus, faGenderless, faTrash, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp2020-lifepath-section',
  templateUrl: './cp2020-lifepath-section.component.html',
  styleUrls: ['./cp2020-lifepath-section.component.css']
})
export class Cp2020LifepathSectionComponent implements OnInit {
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
  source: string = 'CP2020';

  @Input()
  isAlwaysEventful: boolean = false;

  @Input()
  eventYears: number = 0;

  @Input()
  isCollapsed = false;

  @Output()
  changeLifepath = new EventEmitter<LifePathResults>();

  @ViewChildren('siblingNameElem')
  siblingNameInputList: QueryList<ElementRef>;

  @ViewChild('newSiblingElem', {static: false})
  newSiblingButton: ElementRef;

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
      this.eventful = this.isAlwaysEventful;
      this.selectedSource = this.source;
    });
  }

  ngOnChanges() {
    this.newLifPath = new LifePathResults(this.lifepath);
    this.years = this.eventYears;
    this.eventful = this.isAlwaysEventful;
    this.selectedSource = this.source;
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
      this.onChangeLifePath();
    });
  }

  addSibling() {
    const sibling = new Sibling();
    this.newLifPath.family.siblings.siblings.push(sibling);
    this.changeLifepath.emit(this.newLifPath);
    this.siblingNameInputList.last.nativeElement.focus();
  }

  removeSibling(index: number) {
    this.newLifPath.family.siblings.siblings.splice(index, 1);
    this.changeLifepath.emit(this.newLifPath);
    if(this.siblingNameInputList.length > 0) {
      this.siblingNameInputList.last.nativeElement.focus();
    } else {
      this.newSiblingButton.nativeElement.focus();
    }
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
