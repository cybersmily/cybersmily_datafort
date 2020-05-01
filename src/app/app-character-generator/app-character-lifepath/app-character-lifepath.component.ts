import { LifePathGeneratorService } from './../../shared/services/lifepath/life-path-generator.service';
import { TitleValue } from './../../shared/models/title-value';
import { SourcesDataService } from './../../shared/services/lifepath/sources-data.service';
import { Sibling } from './../../shared/models/lifepath/lifepath-sibling';
import { LifePathResults } from './../../shared/models/lifepath/lifepath-results';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { faMars, faVenus, faDice } from '@fortawesome/free-solid-svg-icons';
// import { LifeEventsGeneratorService } from './../../shared/services/lifepath/life-events-generator.service';

@Component({
  selector: 'cs-app-character-lifepath',
  templateUrl: './app-character-lifepath.component.html',
  styleUrls: ['./app-character-lifepath.component.css']
})
export class AppCharacterLifepathComponent implements OnInit, OnChanges {
  faMars = faMars;
  faVenus = faVenus;
  faDice = faDice;
  sources = new Array<TitleValue>();
  selectedSource = 'CP2020';
  years = 0;

  @Input()
  lifepath = new LifePathResults();

  @Output()
  changeLifepath = new EventEmitter<LifePathResults>();

  brothers = 0;
  sisters  = 0;

  constructor( private sourceService: SourcesDataService,
    private lifepathGenerator: LifePathGeneratorService
    ) { }

  ngOnInit() {
    this.brothers = this.lifepath.family.siblings.getBrothersCount();
    this.sisters = this.lifepath.family.siblings.getSistersCount();
    this.sourceService
    .getSources()
    .subscribe( sources => {
      this.sources = sources;
    });
  }


  ngOnChanges() {
    this.brothers = this.lifepath.family.siblings.getBrothersCount();
    this.sisters = this.lifepath.family.siblings.getSistersCount();
  }

  onChangeEventRow() {
  }

  onChangeLifePath() {
    this.changeLifepath.emit(this.lifepath);
  }

  onChangeSiblings() {
    const count = this.brothers + this.sisters;
    this.lifepath.family.siblings.siblings = new Array<Sibling>(count);
    this.lifepath.family.siblings.siblings.fill({gender: 'brother', feeling: '', age: ''}, 0, this.brothers);
    this.lifepath.family.siblings.siblings.fill({gender: 'sister', feeling: '', age: ''}, this.brothers);
    this.changeLifepath.emit(this.lifepath);
  }

  roll() {
    this.lifepath = new LifePathResults();
    this.lifepathGenerator
    .generateLifePath(this.selectedSource, true, this.years.toString())
    .subscribe( lifepath => {
      this.lifepath = lifepath;
      this.brothers = this.lifepath.family.siblings.getBrothersCount();
      this.sisters = this.lifepath.family.siblings.getSistersCount();
    });
  }

  changeYear() {
    if ( this.years > 12) {
      this.years = 12;
    }
  }

}
