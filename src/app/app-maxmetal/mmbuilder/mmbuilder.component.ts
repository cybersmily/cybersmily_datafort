import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SaveFileService } from './../../shared/services/save-file.service';
import { MaxMetalOption } from './../../shared/models/maxmetal/max-metal-option';
import { MaxmetalService } from '../../shared/services/maxmetal/maxmetal.service';
import { MaxMetalVehicle, VehicleType } from '../../shared/models/maxmetal';
import { MaxMetalWeapon } from '../../shared/cp2020/cp2020weapons/models/max-metal-weapon';
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'cs-mmbuilder',
  templateUrl: './mmbuilder.component.html',
  styleUrls: ['./mmbuilder.component.css']
})
export class MmbuilderComponent implements OnInit {
  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };

  @ViewChild('maxMetalMessageModal', {static: false})
  private messageTemplate: TemplateRef<any>;

  @Input()
  vehicleTypes: VehicleType[];

  vehicle: MaxMetalVehicle;
  disableInput: boolean;
  message = '';

  selectedType: VehicleType = null;

  outString: string;

  constructor(private mmService: MaxmetalService,
              private saveFileService: SaveFileService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.mmService.cast.subscribe( vehicle => {
      this.vehicle = vehicle;
    });
    this.disableInput = true;
    this.modalService.onHide.subscribe( () => this.disableInput = false);
  }


  /**
   * Set the min/max of certain attributes.
   *
   * @memberof MmbuilderComponent
   */
  changeType() {
    if (this.selectedType) {
      this.mmService.setVehicleType(this.selectedType);
      // before changing, prompt user that they will lose all their changes.
      this.disableInput = false;
    } else {
      this.disableInput = true;
    }

  }

  changeSDP(sdp: number) {
    this.mmService.changeSDP(sdp);
  }

  changeExtraSDP( sdp: number) {
    this.mmService.changeExtraSDP(sdp);
  }

  changeSpace() { }

  changeArmor(sp: number) {
    this.mmService.changeSP(sp);
  }

  /**
   * MAX METAL pg. 14
   * Added Speed: Each 10% of original Top Speed added to vehicle's Top Speed
   * raises the base SDP cost of vehicle by 25% and takes up 5% of vehicle's
   * spaces. Maximum boost +100% speed.
   * Lowered Speed: Each 10% Top Speed under normal Top Speed adds 10% more
   * spaces to a vehicle and lowers the vehicle's SDP cost by 10%.
   * @memberof MmbuilderComponent
   */
  changeSpeed(value: number) {
    this.mmService.changeTopSpeed(value);
  }

  /**
   * MAX METAL pg. 14
   * Boosted Acceleration: Each 10% acceleration added to a vehicle's
   * acceleration (minimum boost allowed is 5mph) costs 5% of the vehicle's
   * base SDP cost. Maximum boost 100% acceleration.
   * @memberof MmbuilderComponent
   */
  changeAcceleration(value: number) {
    this.mmService.changeAcceleration(value);
  }

  /**
   * MAX METAL pg. 14
   * Heavy-Duty Brakes: Each 25% of deceleration added to a vehicle's deceleration
   * (minimum addition allowed is 5mph) costs 5% of the vehicle's base SDP
   * cost. Maximum added deceleration is 50% for air vehicle and 100% for ground
   * vehicles (hovers count as an air vehicle for this option).
   * @memberof MmbuilderComponent
   */
  changeDeceleration(value: number) {
    this.mmService.changeDeceleration(value);
  }

  /**
   * Per MAX METAL pg 14
   * Addional Range: Each 33% added to a vehicle's range subtracts
   * 10% of a vehicle's space
   * Shortened Range: Each 33% subtracted from the listed range
   * adds 10% more spaces to a vehicle
   * @param {number} range
   * @memberof MmbuilderComponent
   */
  changeRange(range: number) {
    this.mmService.changeRange(range);
  }

  /**
   * MAX METAL pg. 14
   * Better Handling: Vehicles may be built with enhanced controls and handling
   * characteristics. Each +1 added to Driving/Piloting skill raises SDP cost
   * by 50%; maximum handling addition +3.
   *
   * @memberof MmbuilderComponent
   */
  changeHandling(value: number) {
    this.mmService.changeHandling(value);
   }

  /**
   * MAX METAL pg. 14
   * Off-Road Capability: Allows the vehicle to be operated off paved roads,
   * at 1/3 top road speed. This raises SDP cost by 15%.
   *
   * @memberof MmbuilderComponent
   */
  changeOffRoad() {
    this.mmService.calculateCost();
  }

  changeCrew(value: number) {
    this.mmService.changeCrew(value);
    /*
    if (!this.mmService.changeCrew(value) && !this.disableInput) {
      this.disableInput = true;
      this.message = 'Not enough space to add more crew members.';
      this.openModal(this.messageTemplate);
    } else {
      this.message = '';
    }
    */
  }
  changePassengers(value: number) {
    this.mmService.changePassengers(value);
  }

  /**
   * MAX METAL pg. 14
   * Cargo: Most vehicles (with the exception of AFVs, which are already very
   * heavily laden) have cargo capacity equal to 33% of their mass. Each extra
   * 10% of the vehicle's mass added to cargo capacity subtracts 10% from the
   * vehicle's top speed. The maximum cargo capacity that can be added in this
   * fashion is 50% of the vehicle's mass. When adding cargo capacity to airships,
   * each 10% of speed reduction adds 33% to the airship's cargo capacity.
   * Trucks have a Mass Rating; this is how much they can haul. This Mass Rating
   * can be improved at a rate of each 10% additional Mass Rating slowing the
   * truck's Top Speed by 20%, maximum Mass Rating improvement +20%.
   * @memberof MmbuilderComponent
   */
  changeCargo() {}

  addWeapon(weapon: MaxMetalWeapon) {
    if (!this.mmService.addWeapon(weapon) && !this.disableInput) {
      this.disableInput = true;
      this.message = 'Not enough space to add weapon.';
      this.openModal(this.messageTemplate);
    } else {
      this.message = '';
    }
  }

  removeWeapon(weapon: MaxMetalWeapon) {
    this.mmService.removeWeapon(weapon);
  }

  addOption(option: MaxMetalOption) {
    if (!this.mmService.addOption(option) && !this.disableInput) {
      this.disableInput = true;
      this.message = 'Not enough space to add the option.';
      this.openModal(this.messageTemplate);
    } else {
      this.message = '';
    }
  }

  removeOption(option: MaxMetalOption) {
    this.mmService.removeOption(option);
  }

  saveList() {
    this.saveFileService.SaveAsFile('CP2020_' + (this.mmService.currVehicle.name.replace(' ', '_')), this.mmService.currVehicle.toString());
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
    this.disableInput = false;
  }
}
