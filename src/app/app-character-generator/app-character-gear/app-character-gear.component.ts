import { faPlus, faTrash, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerGearList } from './../../shared/models/cp2020character/cp2020-player-gear-list';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cp2020PlayerGear } from './../../shared/models/cp2020character';

@Component({
  selector: 'cs-app-character-gear',
  templateUrl: './app-character-gear.component.html',
  styleUrls: ['./app-character-gear.component.css']
})
export class AppCharacterGearComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  get collapseChevron():any {
    return (this.isCollapsed) ? this.faChevronRight : this.faChevronDown;
  }

  @Input()
  gear = new Cp2020PlayerGearList(25);

  @Input()
  isCollapsed = false;

  @Output()
  changeGear = new EventEmitter<Cp2020PlayerGearList>();

  constructor() { }

  ngOnInit() {
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
  }

  removeGearRow(index: number, column: number) {
    let count = 0;
    if (column === 2) {
      count = Math.ceil(this.gear.items.length/2);
    }
    this.gear.items.splice(index + count, 1);
    this.onGearChange();
  }

}
