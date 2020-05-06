import { VehicleType } from './vehicle-type';
import { CyberDeck } from './../gear/cyber-deck';
import { MaxMetalVehStat } from './max-metal-veh-stat';

export class MaxMetalVehSpeed implements MaxMetalVehStat {
  curr: number;
  base: number;
  min: number;
  max: number;
  cost: number;
  accelerate: MaxMetalVehStat;
  decelerate: MaxMetalVehStat;

  constructor() {
    this.curr = 0;
    this.base = 0;
    this.min = 0;
    this.max = 0;
    this.accelerate = {
      min: 0,
      max: 0,
      base: 0,
      curr: 0,
      cost: 0
    };
    this.decelerate = {
      min: 0,
      max: 0,
      base: 0,
      curr: 0,
      cost: 0
    };
  }


  setSpeed(type: VehicleType) {
    this.accelerate = {
      min: type.acc,
      max: type.acc * 2,
      base: type.acc,
      curr: type.acc,
      cost: 1
    };
    // set the deceleration
    this.decelerate.min = type.dec;
    this.decelerate.max = type.isAirVehicle
      ? Math.round(type.dec * 1.5)
      : Math.round(type.dec * 2);
    this.decelerate.base = type.dec;
    this.decelerate.curr = type.dec;
  }

  /**
   * calculates the topspeed object withint he currVeicle.
   * topspeed is based off the speed of the vehicle type.
   * This will be adjusted by SP value as well.
   * @memberof MaxmetalService
   */
  calculateSpeed(type: VehicleType, spMod: number) {
    // adjust the speed based on SP
    const modifier = 1 - spMod;
    // reset the base and max topspeed
    this.base = Math.floor(type.speed * modifier);
    this.max = this.base * 2;
    this.min = Math.round(this.base * 0.1);
    this.curr = this.curr
      ? this.curr
      : type.speed;
    if (this.curr > this.max) {
      this.curr = this.max;
    }
    // caculate the eb cost
    if (this.curr > this.base) {
      // increase SDP by 25% per 10% of speed
      this.cost =
        1 +
        0.25 *
          (Math.floor((this.curr / this.base) * 10) % 10);
    } else if (this.curr < this.base) {
      // decrease SDP by 10% per 10% of speed
      this.cost =
        0.1 * (Math.ceil((this.curr / this.base) * 10) % 10);
      if (this.cost <= 0) {
        this.cost = 1;
      }
    } else {
      this.cost = 1;
    }
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
    this.curr += value;
    this.curr = (this.curr > this.max) ? this.max : ((this.curr < this.min) ? this.min : this.curr);
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
    this.accelerate.curr += value;
    this.accelerate.curr = (this.accelerate.curr > this.accelerate.max) ? this.accelerate.max :
        (this.accelerate.curr < this.accelerate.min ? this.accelerate.min : this.accelerate.curr);
    const boost = this.accelerate.curr - this.accelerate.base;
    if (value > 0 && boost < 5) {
      this.accelerate.curr = this.accelerate.base + 5;
    }
    if (value < 0 && boost < 5) {
      this.accelerate.curr = this.accelerate.base;
    }
    // calculate sdp cost
    const factor = Math.floor(
      ((this.accelerate.curr / this.accelerate.base) % 1) * 10
    );
    this.accelerate.cost = 1 + 0.05 * factor;
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
   this.decelerate.curr += value;
   this.decelerate.curr = (this.decelerate.curr > this.decelerate.max) ? this.decelerate.max :
       (this.decelerate.curr < this.decelerate.min ? this.decelerate.min : this.decelerate.curr);
   const boost = this.decelerate.curr - this.decelerate.base;
   if (value > 0 && boost < 5) {
     this.decelerate.curr = this.decelerate.base + 5;
   }
   if (value < 0 && boost < 5) {
     this.decelerate.curr = this.decelerate.base;
   }
   // calculate sdp cost
   const factor = Math.floor(
     Math.floor(((this.decelerate.curr / this.decelerate.base) % 1) * 100) / 25
   );
   this.decelerate.cost = 1 + 0.05 * factor;
 }
}
