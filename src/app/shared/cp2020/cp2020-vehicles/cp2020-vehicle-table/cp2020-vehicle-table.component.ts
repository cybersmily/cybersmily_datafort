import { Cp2020Vehicle } from './../models/cp2020-vehicle';
import {
  faChevronDown,
  faChevronRight,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'cs-cp2020-vehicle-table',
  templateUrl: './cp2020-vehicle-table.component.html',
  styleUrls: ['./cp2020-vehicle-table.component.css'],
})
export class Cp2020VehicleTableComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  collapseChevron(isCollapsed: boolean): any {
    return isCollapsed ? faChevronRight : this.faChevronDown;
  }

  @Input()
  vehicles: Array<Cp2020Vehicle> = Array<Cp2020Vehicle>();

  @Input()
  isCollapsed: boolean = false;

  @Output()
  update: EventEmitter<Array<Cp2020Vehicle>> = new EventEmitter<
    Array<Cp2020Vehicle>
  >();

  currVehicles: Array<Cp2020Vehicle> = Array<Cp2020Vehicle>();

  constructor() {}

  ngOnInit(): void {
    this.currVehicles = [...this.vehicles];
  }

  ngOnChanges(): void {
    this.currVehicles = [...this.vehicles];
  }

  addVehicle() {
    this.currVehicles.push(new Cp2020Vehicle());
    this.update.emit(this.currVehicles);
  }

  updateVehicle(vehicle: Cp2020Vehicle, index: number) {
    this.currVehicles[index] = new Cp2020Vehicle(vehicle);
    this.update.emit(this.currVehicles);
  }

  deleteVehicle(index: number) {
    this.currVehicles.splice(index, 1);
    this.update.emit(this.currVehicles);
  }
}
