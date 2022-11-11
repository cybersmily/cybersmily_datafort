import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Cp2020GearDataService } from './../../services/cp2020-gear-data/cp2020-gear-data.service';
import {
  faPlus,
  faTrash,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import {
  Cp2020PlayerGear,
  Cp2020PlayerGearList,
  Cp2020Gear,
} from './../../models';

@Component({
  selector: 'cs-cp2020-gear-list',
  templateUrl: './cp2020-gear-list.component.html',
  styleUrls: ['./cp2020-gear-list.component.css'],
})
export class Cp2020GearListComponent implements OnInit, AfterViewInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  index = 0;

  gearDataList = new Array<Cp2020Gear>();

  get collapseChevron(): any {
    return this.isCollapsed ? this.faChevronRight : this.faChevronDown;
  }

  @Input()
  gear = new Cp2020PlayerGearList(25);

  @Input()
  isCollapsed = false;

  @Output()
  changeGear = new EventEmitter<Cp2020PlayerGearList>();

  @ViewChild('gearTitleElem', { static: false })
  gearTitleHeader: ElementRef;

  @ViewChildren('gearNameElem')
  gearNameElemList: QueryList<ElementRef>;

  constructor(private gearDataService: Cp2020GearDataService) {}

  ngOnInit() {
    this.gearDataService.gearList.subscribe((data) => {
      this.gearDataList = [...data];
    });
  }

  ngAfterViewInit(): void {
    if (this.gearNameElemList.length > 0 && this.index > -1) {
      this.gearNameElemList.toArray()[this.index].nativeElement.focus();
    } else {
      this.gearTitleHeader.nativeElement.focus();
    }
  }

  onGearChange() {
    this.changeGear.emit(this.gear);
  }

  get firstColumn(): Array<Cp2020PlayerGear> {
    const count = Math.ceil(this.gear.items.length / 2);
    return this.gear.items.slice(0, count);
  }

  get secondColumn(): Array<Cp2020PlayerGear> {
    const count = Math.ceil(this.gear.items.length / 2);
    return this.gear.items.slice(count);
  }

  addGearRow() {
    this.gear.items.push(new Cp2020PlayerGear());
    this.onGearChange();
    this.gearNameElemList.last.nativeElement.focus();
  }

  removeGearRow(index: number, column: number) {
    console.log(index, column);
    let count = 0;
    if (column === 2) {
      count = Math.ceil(this.gear.items.length / 2);
    }
    this.gear.items.splice(index + count, 1);
    this.index = index - 1;
    this.onGearChange();
    if (this.gearNameElemList.length > 0 && this.index > -1) {
      this.gearNameElemList.toArray()[this.index].nativeElement.focus();
    } else {
      this.gearTitleHeader.nativeElement.focus();
    }
  }

  setDetails(event: TypeaheadMatch, index: number, column: number): void {
    console.log(index, column);
    let count = 0;
    if (column === 2) {
      count = Math.ceil(this.gear.items.length / 2);
    }
    this.gear.items[index + count] = new Cp2020PlayerGear(event.item);
    this.onGearChange();
  }
}
