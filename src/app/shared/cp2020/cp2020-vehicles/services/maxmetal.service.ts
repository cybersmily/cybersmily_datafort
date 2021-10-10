import { MaxMetalWeapon } from './../../cp2020weapons/models';
import { MaxMetalOption, MaxMetalVehicle, VehicleType } from './../models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MaxmetalService {
  private vehicle = new BehaviorSubject<MaxMetalVehicle>(new MaxMetalVehicle());
  cast = this.vehicle.asObservable();

  currVehicle: MaxMetalVehicle;

  constructor() {
    this.currVehicle = new MaxMetalVehicle();
  }


  /**
   * sets the current vehicles type. This will also set up the initial
   * current vehicle's properties.
   * @param {VehicleType} type
   * @memberof MaxmetalService
   */
  setVehicleType(type: VehicleType) {
    this.currVehicle = new MaxMetalVehicle();
    this.currVehicle.setVehicleType(type);

    this.vehicle.next(this.currVehicle);
  }

  /**
   * change the value of the current vehicle's SDP and then
   * calculates all the other properties associated with that change.
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeSDP(value: number) {
    this.currVehicle.changeSDP(value);
  }


  /**
   * MAX METAL pg 14
   * Added Strucutre: Vehicles with superior construction (heavier materials, roll
   * cages, etc.) may have up to 25% more SDP than the maximum for their vehicle
   * type. Each extra point of SDP costs double the normal SDP cost.
   * Weaker Structure: Cheap vehciles may have only half of their required SDP. This
   * makes them more liable to combat damage and has the additional detriment of making
   * them break down often during play.
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeExtraSDP(value: number) {
    this.currVehicle.changeExtraSDP(value);
  }

  /**
   * MAX METAL pg 14
   * Armor: Maximum armor SP total is 1/2 of SDP total. Each 10% (or part thereof)
   * of a vehicle's SDP in SP lowers vehicle's speed by 10% (this lowers an
   * Osprey's or helicopter's speed by 20% per 10% SP).
   * Armor costs are determined
   * by the amount of armore desired - vehicle armored from 1-20 SP pay 500eb
   * per SP. Vehicle arrmored from 21-40 SP pay 1,000eb per SP. Vehicles with 41-60
   * SP pay 5,000eb per SP.
   * Vehicles with over 60 SP armor pay 7,000eb per SP. For instance, 50 SP
   * of vehicle armor costs (50x5,000) = 250,000eb. Ospreys and airplanes can have
   * a maximum SP armor of 1/4 their SDP. Airships can't be armored, an airship
   * gondala can, but the gasbag can't; and the gasbag is hit 90% of the time,
   * unless specifically aiming for the gondala.
   * A vehicle without armor actually weighs half the listed mass. The mass
   * calculations above are retained for purposes of mounting pod weapons and
   * collisions.
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeSP(value: number) {
    this.currVehicle.changeSP(value);
  }

  /**
   * MAX METAL pg. 14
   * Better Handling: Vehicles may be built with enhanced controls and handling
   * characteristics. Each +1 added to Driving/Piloting skill raises SDP cost
   * by 50%; maximum handling addition +3.
   * @param {number} value   *
   * @memberof MaxmetalService
   */
  changeHandling(value: number) {
    this.currVehicle.changeHandling(value);
  }

  changeCrew(value: number): boolean  {
    return this.currVehicle.changeCrew(value);
  }

  changePassengers(value: number): boolean {
    return this.currVehicle.changePassenger(value);
  }

  /**
   * MAX METAL pg. 14
   * Added Speed: Each 10% of original Top Speed added to vehicle's Top Speed
   * raises the base SDP cost of vehicle by 25% and takes up 5% of vehicle's
   * spaces. Maximum boost +100% speed.
   * Lowered Speed: Each 10% Top Speed under normal Top Speed adds 10% more
   * spaces to a vehicle and lowers the vehicle's SDP cost by 10%.
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeTopSpeed(value: number) {
    this.currVehicle.changeTopSpeed(value);
  }

  /**
   * MAX METAL pg. 14
   * Boosted Acceleration: Each 10% acceleration added to a vehicle's
   * acceleration (minimum boost allowed is 5mph) costs 5% of the vehicle's
   * base SDP cost. Maximum boost 100% acceleration.
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeAcceleration(value: number) {
    this.currVehicle.changeAcceleration(value);
  }


  /**
   * Heavy-Duty Brakes: Each 25% of deceleration added to a vehicle's deceleration
   * (minimum addition allowed is 5mph) costs 5% of the vehicle's base SDP
   * cost. Maximum added deceleration is 50% for air vehicle and 100% for ground
   * vehicles (hovers count as an air vehicle for this option).
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeDeceleration(value: number) {
    this.currVehicle.changeDeceleration(value);
  }


  /**
   * Per MAX METAL pg 14
   * Addional Range: Each 33% added to a vehicle's range subtracts
   * 10% of a vehicle's space
   * Shortened Range: Each 33% subtracted from the listed range
   * adds 10% more spaces to a vehicle
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeRange(value: number) {
    this.currVehicle.changeRange(value);
  }

  toggleOffRoad() {
    this.currVehicle.toggleOffRoad();
  }

  calculateCost() {
    this.currVehicle.calculateCost();
  }

  addWeapon(value: MaxMetalWeapon): boolean {
    return this.currVehicle.addWeapon(value);
  }

  removeWeapon(value: MaxMetalWeapon) {
    this.currVehicle.removeWeapon(value);
  }

  addOption(option: MaxMetalOption) {
    return this.currVehicle.addOption(option);
  }

  removeOption(option: MaxMetalOption) {
    this.currVehicle.options.removeOption(option);
  }
}
