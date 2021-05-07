import { LifepathEvent } from './../../shared/models/lifepath/lifepath-event';
import { LifePathGeneratorService } from './../../shared/services/lifepath/life-path-generator.service';
import { TitleValue } from './../../shared/models/title-value';
import { SourcesDataService } from './../../shared/services/lifepath/sources-data.service';
import { Sibling } from './../../shared/models/lifepath/lifepath-sibling';
import { LifePathResults } from './../../shared/models/lifepath/lifepath-results';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { faMars, faVenus, faDice, faTransgender, faNeuter, faPlus, faGenderless } from '@fortawesome/free-solid-svg-icons';
// import { LifeEventsGeneratorService } from './../../shared/services/lifepath/life-events-generator.service';

@Component({
  selector: 'cs-app-character-lifepath',
  templateUrl: './app-character-lifepath.component.html',
  styleUrls: ['./app-character-lifepath.component.css']
})
export class AppCharacterLifepathComponent implements OnInit {
  faMars = faMars;
  faVenus = faVenus;
  faGenderless= faGenderless;
  faDice = faDice;
  faPlus = faPlus;


  sources = new Array<TitleValue>();
  selectedSource = 'CP2020';
  years = 0;

  @Input()
  lifepath = new LifePathResults();

  @Output()
  changeLifepath = new EventEmitter<LifePathResults>();

  constructor( private sourceService: SourcesDataService,
    private lifepathGenerator: LifePathGeneratorService
    ) { }

  ngOnInit() {
    this.sourceService
    .getSources()
    .subscribe( sources => {
      this.sources = sources;
    });
  }

  get siblings(): Array<Sibling> {
    if ( this.lifepath && this.lifepath.family.siblings) {
      return this.lifepath.family.siblings.siblings.sort( (a, b) => a.age.localeCompare(b.age));
    }
    return new Array<Sibling>();
  }

  get sibs(): number {
    return this.lifepath.family.siblings.getSibCount();
  }

  get brothers(): number {
    return this.lifepath.family.siblings.getBrothersCount();
  }

  get sisters(): number {
    return this.lifepath.family.siblings.getSistersCount();
  }

  onChangeLifePath() {
    this.changeLifepath.emit(this.lifepath);
  }

  roll() {
    this.lifepath = new LifePathResults();
    this.lifepathGenerator
    .generateLifePath(this.selectedSource, true, this.years.toString())
    .subscribe( lifepath => {
      this.lifepath = lifepath;
    });
  }

  addSibling() {
    const sibling = new Sibling();
    this.lifepath.family.siblings.siblings.push(sibling);
    this.changeLifepath.emit(this.lifepath);
  }

  changeYear() {
    if ( this.years > 12) {
      this.years = 12;
    }
  }

  addYear() {
    const year: LifepathEvent = {age: 0, event: ''};
    this.lifepath.events.push(year);
    this.changeLifepath.emit(this.lifepath);
  }

}
