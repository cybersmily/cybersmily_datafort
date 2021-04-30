import { SaveFileService } from './../../shared/services/file-services';
import { faPlus, faSave, faRedo } from '@fortawesome/free-solid-svg-icons';
import { HotStuffArea } from './../../shared/models/fixer/hot-stuff-area';
import { FixerHotStuffService } from './../../shared/services/fixer/fixer-hot-stuff.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-fixer-calc-hot-stuff',
  templateUrl: './fixer-calc-hot-stuff.component.html',
  styleUrls: ['./fixer-calc-hot-stuff.component.css']
})
export class FixerCalcHotStuffComponent implements OnInit {
  faPlus = faPlus;
  faSave = faSave;
  faRedo = faRedo;

  streetdeal: number;
  newArea: HotStuffArea = new HotStuffArea();
  areas: Array<HotStuffArea> = new Array<HotStuffArea>();

  constructor( private hotstuff: FixerHotStuffService,
                private fileService: SaveFileService
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
