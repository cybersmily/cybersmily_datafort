import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { VehicleData } from './../models/vehicle-data';
import { Observable } from 'rxjs';
import { CP2020VehicleDataService } from './../services/cp2020-vehicle-data.service';
import { Cp2020VehicleWeapon } from './../../cp2020weapons/models';
import { Cp2020Vehicle, Cp2020VehicleTypes } from './../models';
import {
  faPen,
  faPlus,
  faTrash,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'cs-cp2020-vehicle-details',
  templateUrl: './cp2020-vehicle-details.component.html',
  styleUrls: ['./cp2020-vehicle-details.component.css'],
})
export class Cp2020VehicleDetailsComponent implements OnInit, OnChanges {
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;
  faSave = faSave;

  @Input()
  vehicle: Cp2020Vehicle = new Cp2020Vehicle();

  @Input()
  index: number = -1;

  @Output()
  update: EventEmitter<Cp2020Vehicle> = new EventEmitter<Cp2020Vehicle>();

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('vehicleNameElem', { static: false })
  vehicleNameInput: ElementRef;

  currVehicle: Cp2020Vehicle = new Cp2020Vehicle();

  vehicleList$: Observable<Array<VehicleData>>;
  isEditable: boolean = false;

  get types(): Array<string> {
    return Cp2020VehicleTypes.types;
  }

  get maxSP(): number {
    return Math.ceil(this.currVehicle.sdp / 2);
  }

  constructor(private vehicleDataListService: CP2020VehicleDataService) {}

  ngOnInit(): void {
    this.vehicleList$ = this.vehicleDataListService.vehicleList;
    this.currVehicle = new Cp2020Vehicle(this.vehicle);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currVehicle = new Cp2020Vehicle(this.vehicle);
  }

  updateVehicle() {
    this.update.emit(this.currVehicle);
  }

  deleteVehicle() {
    this.delete.emit(this.index);
  }

  selectVehicle(event: TypeaheadMatch): void {
    this.currVehicle = new Cp2020Vehicle(event.item);
  }

  save() {
    this.isEditable = false;
    this.updateVehicle();
  }

  addWeapon() {
    this.currVehicle.weapons.push(new Cp2020VehicleWeapon());
  }

  deleteWeapon(index: number) {
    this.currVehicle.weapons.splice(index, 1);
  }

  addOption() {
    this.currVehicle.options.push({
      name: '',
      type: '',
      cost: 0,
      spaces: '',
    });
  }

  deleteOption(index: number) {
    this.currVehicle.options.splice(index, 1);
  }
}
