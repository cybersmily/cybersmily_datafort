import { take } from 'rxjs';
import { Cp2020FixerContactDataService } from './../../services/cp2020-fixer-contact-data/cp2020-fixer-contact-data.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { FixerHotStuffGenerationService } from './../../services/fixer-hot-stuff-generation/fixer-hot-stuff-generation.service';
import { HotStuffArea } from './../../models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faRedo, faDice } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp2020-hot-stuff-contacts',
  templateUrl: './cp2020-hot-stuff-contacts.component.html',
  styleUrls: ['./cp2020-hot-stuff-contacts.component.css'],
})
export class Cp2020HotStuffContactsComponent implements OnInit {
  faRedo = faRedo;
  faDice = faDice;

  @Input()
  hotStuffContacts: Array<HotStuffArea> = new Array<HotStuffArea>();

  currHotStuffContacts: Array<HotStuffArea> = new Array<HotStuffArea>();
  fieldList: Array<string> = new Array<string>();

  @Input()
  skillLevel: number = 0;

  @Output()
  updateContacts: EventEmitter<Array<HotStuffArea>> = new EventEmitter<
    Array<HotStuffArea>
  >();

  constructor(
    private hotStuffGenerateService: FixerHotStuffGenerationService,
    private dice: DiceService,
    private fixerDataService: Cp2020FixerContactDataService
  ) {}

  ngOnInit(): void {
    this.currHotStuffContacts = this.hotStuffContacts.map(
      (contact) => new HotStuffArea(contact)
    );
    this.fixerDataService.areaLists
      .pipe(take(1))
      .subscribe((areaList) => (this.fieldList = [...areaList]));
  }

  get totalPoints(): number {
    return this.skillLevel * this.skillLevel;
  }

  get spentPoints(): number {
    return this.currHotStuffContacts.reduce((a, b) => a + b.points, 0);
  }

  get firstColumn(): Array<HotStuffArea> {
    return this.currHotStuffContacts.slice(0, this.columnTwoIndex);
  }

  get secondColumn(): Array<HotStuffArea> {
    return this.currHotStuffContacts.slice(this.columnTwoIndex);
  }

  get columnTwoIndex(): number {
    return Math.ceil(this.currHotStuffContacts.length / 2);
  }

  generate(): void {
    if (this.skillLevel > 0) {
      this.currHotStuffContacts = this.hotStuffGenerateService.randomlyGenerate(
        this.dice,
        this.fieldList,
        this.totalPoints
      );
      this.update();
    }
  }

  update(): void {
    this.updateContacts.emit(this.currHotStuffContacts);
  }

  delete(index: number): void {
    this.currHotStuffContacts.splice(index, 1);
    this.update();
  }

  add(area: HotStuffArea): void {
    this.currHotStuffContacts.push(area);
    this.update();
  }

  edit(event: { area: HotStuffArea; index: number }): void {
    this.currHotStuffContacts[event.index] = new HotStuffArea(event.area);
    this.update();
  }

  reset(): void {
    this.currHotStuffContacts = new Array<HotStuffArea>();
    this.update();
  }
}
