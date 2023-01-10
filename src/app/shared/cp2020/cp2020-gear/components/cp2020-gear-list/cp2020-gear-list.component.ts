import { DndDropEvent } from 'ngx-drag-drop';
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
  OnChanges,
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
export class Cp2020GearListComponent implements OnInit, OnChanges, AfterViewInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  index = 0;

  gearDataList = new Array<Cp2020Gear>();
  newLocation = '';
  expandLocation = new Array<string>();

  get collapseChevron(): any {
    return this.isCollapsed ? this.faChevronRight : this.faChevronDown;
  }

  get locations(): Array<string> {
    return this.gear?.locations && this.gear.locations.length > 0
      ? this.gear.locations
      : [];
  }

  get isAddableLocation(): boolean {
    return !(
      this.newLocation !== '' && !this.locations.includes(this.newLocation)
    );
  }


  @Input()
  gear = new Cp2020PlayerGearList(2);

  currGear = new Cp2020PlayerGearList(2);

  @Input()
  isCollapsed = false;

  @Output()
  changeGear = new EventEmitter<Cp2020PlayerGearList>();

  @ViewChild('gearTitleElem', { static: false })
  gearTitleHeader: ElementRef;

  @ViewChildren('gearNameElem')
  gearNameElemList: QueryList<ElementRef>;

  constructor(private gearDataService: Cp2020GearDataService) { }

  ngOnInit(): void {
    this.gearDataService.gearList.subscribe((data) => {
      this.gearDataList = [...data];
    });
    this.currGear = new Cp2020PlayerGearList(this.gear);
    if (!this.isCollapsed) {
      this.expandLocation = [...this.currGear.locations];
    }
  }

  ngOnChanges(): void { }

  ngAfterViewInit(): void {
    if (this.gearNameElemList.length > 0 && this.index > -1) {
      this.gearNameElemList.toArray()[this.index].nativeElement.focus();
    } else {
      this.gearTitleHeader.nativeElement.focus();
    }
  }

  onGearChange(): void {
    this.changeGear.emit(this.gear);
  }

  getLocationGear(location: string): Array<Cp2020PlayerGear> {
    return this.gear.items.filter((gear) => gear.location === location);
  }

  getFirstColumn(gearList: Array<Cp2020PlayerGear>): Array<Cp2020PlayerGear> {
    const count = Math.ceil(gearList.length / 2);
    return gearList.slice(0, count);
  }

  getSecondColumn(gearList: Array<Cp2020PlayerGear>): Array<Cp2020PlayerGear> {
    const count = Math.ceil(gearList.length / 2);
    return gearList.slice(count);
  }

  addGearRow(location?: string): void {
    this.gear.items.push(new Cp2020PlayerGear({ location: location }));
    this.onGearChange();
  }

  addLocation(): void {
    this.gear.locations.push(this.newLocation);
    this.expandLocation.push(this.newLocation);
    this.newLocation = '';
    this.onGearChange();
  }

  removeLocation(location: string): void {
    const index = this.gear.locations.findIndex((loc) => loc === location);
    if (index > -1) {
      this.gear.locations.splice(index);
      this.gear.items = this.gear.items.map((gear) => {
        if (gear.location === location) {
          gear.location = '';
        }
        return gear;
      });
      this.onGearChange();
    }
  }

  removeGearRow(id: any): void {
    const index = this.gear.items.findIndex(
      (gear) => gear.id === id
    );
    if (index > -1) {
      this.gear.items.splice(index, 1);
    }
    this.onGearChange();
  }

  setDetails(event: TypeaheadMatch, index: number, column: number): void {
    let count = 0;
    if (column === 2) {
      count = Math.ceil(this.gear.items.length / 2);
    }
    this.gear.items[index + count] = new Cp2020PlayerGear(event.item);
    this.onGearChange();
  }

  onDrop(event: DndDropEvent, location: string): void {
    if (event.data.type === 'gear') {
      const index = this.gear.items.findIndex(
        (gear) => gear.id === event.data.gear.id
      );
      if (index > -1) {
        this.gear.items[index].location = location;
        this.onGearChange();
      }
    }
  }

  isLocationExpanded(loc: string): boolean {
    return this.expandLocation.includes(loc);
  }

  toggleLocation(loc: string): void {
    const index = this.expandLocation.indexOf(loc);
    if (index > -1) {
      this.expandLocation.splice(index, 1);
    } else {
      this.expandLocation.push(loc);
    }
  }
}
