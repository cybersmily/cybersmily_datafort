import { VehicleSdp } from './vehicle-sdp';
import { VehicleType } from './vehicle-type';
import { MaxMetalVehStat } from './max-metal-veh-stat';
export class MaxMetalVehSdp implements MaxMetalVehStat, VehicleSdp {
  min: number;
  max: number;
  base: number;
  eb: number;
  perSpace: number;
  adjusted: MaxMetalVehStat;

  constructor(vehicleType?: VehicleType) {
    this.setTypeValues(vehicleType);
  }

  get curr(): number {
    return this.base + this.adjusted.curr;
  }

  get baseCost(): number {
    const baseSdp = (this.curr > this.max ) ? this.max : ((this.curr < this.min ) ? this.min : this.curr);
    return baseSdp * this.eb;
  }

  get totalCost(): number {
    let cost = this.curr * this.eb;
    // SDP above max costs double. Simply add the adjusted difference
    if (this.adjusted.curr > 0 ) {
      cost += this.adjusted.curr * this.eb;
    }
    return cost;
  }
  get maxSpaces(): number {
    if ( this.perSpace > 0) {
      return Math.ceil(this.base / this.perSpace);
    }
    return 0;
  }

  setTypeValues(type?: VehicleType) {
    if (type && type.sdp) {
      this.min = type.sdp.min;
      this.max = type.sdp.max;
      this.base = this.min;
      this.perSpace = type.sdp.perSpace;
      this.eb = type.sdp.eb;
    } else {
      this.min = 0;
      this.max = 0;
      this.base = this.min;
      this.perSpace = 0;
      this.eb = 0;
    }
    this.calculateAdjSDP();
  }

  /**
   * change the value of the current vehicle's SDP and then
   * calculates all the other properties associated with that change.
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeSDP(value: number) {
    this.base += value;
    this.base = (this.base > this.max) ? this.max : this.base;
    this.base = (this.base < this.min) ? this.min : this.base;
    this.calculateAdjSDP();
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
    const mod = this.adjusted.curr + value;
    if (this.base <= this.min) {
      this.adjusted.curr = (mod < 0) ? (mod < this.adjusted.min ? this.adjusted.min : mod) : 0;
    }
    if (this.base >= this.max) {
      this.adjusted.curr = (mod > 0) ? (mod > this.adjusted.max ? this.adjusted.max : mod) : 0;
    }
  }

  /**
   * Calculate Adjusted SDP
   * Thsi recalculates the vehcile's SDP for being
   * reinforced or weakened beyond the normal vehile
   * SDP limits.
   * @memberof MaxMetalVehSdp
   */
  private calculateAdjSDP() {
    this.adjusted = { min: 0, max: 0, base: 0, curr: 0};
    this.adjusted.min = -(Math.floor(this.base * 0.5));
    this.adjusted.max = Math.ceil(this.base * 0.25);
    this.adjusted.base = 0;
    this.adjusted.curr = 0;
  }
}
