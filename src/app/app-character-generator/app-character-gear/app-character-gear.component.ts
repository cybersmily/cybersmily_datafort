import { faPlus, faTrash, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerGearList } from './../../shared/models/cp2020character/cp2020-player-gear-list';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Cp2020PlayerGear } from './../../shared/models/cp2020character';

@Component({
  selector: 'cs-app-character-gear',
  templateUrl: './app-character-gear.component.html',
  styleUrls: ['./app-character-gear.component.css']
})
export class AppCharacterGearComponent implements OnInit, AfterViewInit  {
  faPlus = faPlus;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  index = 0;

  get collapseChevron():any {
    return (this.isCollapsed) ? this.faChevronRight : this.faChevronDown;
  }

  @Input()
  gear = new Cp2020PlayerGearList(25);

  @Input()
  isCollapsed = false;

  @Output()
  changeGear = new EventEmitter<Cp2020PlayerGearList>();

  @ViewChild('gearTitleElem', {static: false})
  gearTitleHeader: ElementRef;

  @ViewChildren('gearNameElem')
  gearNameElemList: QueryList<ElementRef>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if(this.gearNameElemList.length > 0 && this.index > -1){
      this.gearNameElemList.toArray()[this.index].nativeElement.focus();
    } else {
      this.gearTitleHeader.nativeElement.focus();
    }
}

  onGearChange() {
    this.changeGear.emit(this.gear);
  }

  get firstColumn(): Array<Cp2020PlayerGear> {
    const count = Math.ceil(this.gear.items.length/2);
    return this.gear.items.slice(0, count);
  }

  get secondColumn(): Array<Cp2020PlayerGear> {
    const count = Math.ceil(this.gear.items.length/2);
    return this.gear.items.slice(count);
  }

  addGearRow() {
    this.gear.items.push(new Cp2020PlayerGear());
    this.onGearChange();
    this.gearNameElemList.last.nativeElement.focus();
  }

  removeGearRow(index: number, column: number) {
    let count = 0;
    if (column === 2) {
      count = Math.ceil(this.gear.items.length/2);
    }
    this.gear.items.splice(index + count, 1);
    this.index = index - 1;
    this.onGearChange();
    if(this.gearNameElemList.length > 0 && this.index > -1){
      this.gearNameElemList.toArray()[this.index].nativeElement.focus();
    } else {
      this.gearTitleHeader.nativeElement.focus();
    }
  }

}
