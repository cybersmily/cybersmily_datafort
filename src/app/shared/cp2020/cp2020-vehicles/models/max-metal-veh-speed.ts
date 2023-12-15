import { VehicleType } from './vehicle-type';
import { MaxMetalVehStat } from './max-metal-veh-stat';

export class MaxMetalVehSpeed implements MaxMetalVehStat {
  private _curr: number;
  private _spMod: number;
  private _base: number;
  accelerate: MaxMetalVehStat;
  decelerate: MaxMetalVehStat;

  constructor(vehType?: VehicleType) {
    if (vehType) {
      this.setSpeed(vehType);
    } else {
      this._base = 0;
      this.spMod = 1;
      this._curr = this.base;
      this.accelerate = {
        min: 0,
        max: 0,
        base: 0,
        curr: 0,
        cost: 1,
      };
      this.decelerate = {
        min: 0,
        max: 0,
        base: 0,
        curr: 0,
        cost: 1,
      };
    }
  }

  get base(): number {
    return this._base;
  }

  get spMod(): number {
    return this._spMod;
  }

  set spMod(value: number) {
    this._spMod = ( value < 1 && value > 0) ? value : 1;
  }

  get curr(): number {
    return Math.floor(this._curr);
  }

  get max(): number {
    return Math.ceil(this.base * 2);
  }

  get min(): number {
    return Math.ceil(this.base * 0.1);
  }

  get costModifier(): number {
    let mod = 1;
    const base = this._base;
    // caculate the eb cost
    if (this.curr > this.base && this.base > 0) {
      // increase SDP by 25% per 10% of speed
      const delta = this.curr - this.base;
      const percent = Math.floor((delta / base) * 10);
      mod = (1 + (0.25 * percent));
    } else if (this.curr < base) {
      // decrease SDP by 10% per 10% of speed
      const percent = Math.floor((this.curr / base) * 10);
      mod = (0.1 * percent);
    }
    return mod;
  }

  setSpeed(type: VehicleType) {
    this._base = type.speed;
    this.spMod = 1;
    this._curr = this.base;
    this.accelerate = {
      min: type.acc,
      max: type.acc * 2,
      base: type.acc,
      curr: type.acc,
      cost: 1,
    };
    // set the deceleration
    this.decelerate = {
      min: type.dec,
      max: (type.isAirVehicle ? Math.round(type.dec * 1.5) : Math.round(type.dec * 2)),
      base: type.dec,
      curr: type.dec,
      cost: 1
    };
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
    this._curr += value;
    this._curr =  this._curr > this.max ? this.max : this._curr < this.min ? this.min : this._curr;
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
    this.accelerate.curr =
      this.accelerate.curr > this.accelerate.max
        ? this.accelerate.max
        : this.accelerate.curr < this.accelerate.min
        ? this.accelerate.min
        : this.accelerate.curr;
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
    this.decelerate.curr =
      this.decelerate.curr > this.decelerate.max
        ? this.decelerate.max
        : this.decelerate.curr < this.decelerate.min
        ? this.decelerate.min
        : this.decelerate.curr;
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
