import { DiceService } from './../../shared/services/dice/dice.service';
import { SaveFileService } from './../../shared/services/file-services';
import { faPlus, faSave, faRedo, faFile, faDice } from '@fortawesome/free-solid-svg-icons';
import { HotStuffArea } from './../../shared/models/fixer/hot-stuff-area';
import { FixerHotStuffService } from './../../shared/services/fixer/fixer-hot-stuff.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartItem } from './../../shared/cp2020/cp2020-fixerCalc/fixerchart';

@Component({
  selector: 'cs-fixer-calc-hot-stuff',
  templateUrl: './fixer-calc-hot-stuff.component.html',
  styleUrls: ['./fixer-calc-hot-stuff.component.css']
})
export class FixerCalcHotStuffComponent implements OnInit {
  faPlus = faPlus;
  faSave = faSave;
  faFile = faFile;
  faRedo = faRedo;
  faDice = faDice;

  @Input()
  fields: Array<string> = new Array<string>();

  streetdeal: number;
  newArea: HotStuffArea = new HotStuffArea();
  areas: Array<HotStuffArea> = new Array<HotStuffArea>();

  constructor( private hotstuff: FixerHotStuffService,
                private fileService: SaveFileService,
                private dice: DiceService
    ) { }

  ngOnInit() {
    this.hotstuff.model.subscribe( m => {
      this.areas = m.areas;
      this.streetdeal = m.streetdeal;
    });
  }

  get totalPoints(): number {
    return this.hotstuff.totalPoints;
  }

  get spentPoints(): number {
    return this.hotstuff.spentPoints;
  }

  get reachedPoints(): boolean {
    return this.spentPoints >= this.totalPoints - 3;
  }

  get canAdd(): boolean {
    return ( (this.newArea.area !== '' && this.newArea.rolls > 0 && !this.exists)
    && this.isUnderPoints);
  }

  get isUnderPoints(): boolean {
    return (this.newArea.points + this.spentPoints <= this.totalPoints);
  }

  get exists(): boolean {
    return this.areas.some( a => a.area.toLowerCase() === this.newArea.area);
  }

  get canRoll(): boolean {
    return (this.streetdeal > 0) && (this.totalPoints - 3 > this.spentPoints);
  }

  generate() {
    if(this.streetdeal > 0) {
      this.hotstuff.randomlyGenerate(this.dice, this.fields);
    }
  }

  generateArea(){
    this.newArea.area = this.fields[this.dice.generateNumber(0, this.fields.length - 1)];
  }

  addArea() {
    if (this.canAdd) {
      this.hotstuff.addArea(this.newArea);
    }
  }

  deleteArea(index: number) {
    this.hotstuff.deleteArea(index);
  }

  editArea(area: HotStuffArea) {
    this.hotstuff.updateArea(area);
  }

  changeNewRolls() {
    if (this.newArea.rolls > 6 ) {
      this.newArea.rolls = 6;
    }
  }

  changeStreetdeal() {
    this.hotstuff.setStreetdeal(this.streetdeal);
  }

  reset() {
    this.hotstuff.reset();
  }

  save() {
    this.fileService.SaveAsFile('FixerHotStuff', this.hotstuff.toString());
  }
}
