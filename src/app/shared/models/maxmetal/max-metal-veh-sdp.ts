import { VehicleType } from './vehicle-type';
import { MaxMetalVehStat } from './max-metal-veh-stat';
export class MaxMetalVehSdp implements MaxMetalVehStat {
  min: number;
  max: number;
  base: number;
  curr: number;
  adjusted: MaxMetalVehStat;

  constructor() {
    this.min = 0;
    this.max = 0;
    this.base = 0;
    this.curr = 0;
    this.adjusted = {min: 0, max: 0, base: 0, curr: 0};
  }

  setTypeValues(type: VehicleType) {
    this.min = type.sdp.min;
    this.max = type.sdp.max;
    this.curr = type.sdp.min;
    this.base = type.sdp.min;
  }

  /**
   * change the value of the current vehicle's SDP and then
   * calculates all the other properties associated with that change.
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeSDP(value: number) {
    this.base += value;
    this.base =
      (this.base > this.max) ?
        this.max : this.base;
    this.curr += value;
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
    this.adjusted.curr += value;
    this.curr += value;
  }


  /**
   * Calculate Adjusted SDP
   * Thsi recalculates the vehcile's SDP for being
   * reinforced or weakened beyond the normal vehile
   * SDP limits.
   * @param {VehicleType} type
   * @memberof MaxMetalVehSdp
   */
  calculateAdjSDP(type: VehicleType) {
    let min = 0;
    let max = 0;
    if (this.base <= this.min) {
      min = -(Math.round(type.sdp.min * 0.5));
    }
    if (this.base >= this.max) {
      max = Math.round(type.sdp.max * 0.25);
    }
    this.adjusted.min = min;
    this.adjusted.max = max;
    this.adjusted.base = 0;
    if (this.adjusted.curr && this.adjusted.curr !== 0 ) {
      this.curr -= this.adjusted.curr;
    }
    this.adjusted.curr = 0;
  }
}
