import { MaxMetalVehOptList } from './max-metal-veh-opt-list';
import { MaxMetalOption } from './max-metal-option';
import { MaxMetalVehSpeed } from './max-metal-veh-speed';
import { MaxMetalVehSdp } from './max-metal-veh-sdp';
import { MaxMetalVehStat } from './max-metal-veh-stat';
import { MaxMetalWeapon, MaxMetalWeaponList } from '../weapon';
import { VehicleType } from './vehicle-type';

export class MaxMetalVehicle {
  name: string;
  type: VehicleType;
  sdp: MaxMetalVehSdp;
  sp: MaxMetalVehStat;
  speed: MaxMetalVehSpeed;
  range: MaxMetalVehStat;
  crew: number;
  passengers: number;
  cargo: string;
  manuever: { curr: number; cost: number };
  weapons: MaxMetalWeaponList;
  mass: { base: number; value: string; curr: number };
  description: string;
  offRoad: boolean;
  cost: number;
  options: MaxMetalVehOptList;

  constructor() {
    this.name = '';
    this.type = new VehicleType();
    this.sdp = new MaxMetalVehSdp();
    this.sp = { min: 0, max: 0, base: 0, curr: 0, cost: 0, spdMod: 0 };
    this.speed = new MaxMetalVehSpeed();
    this.range = { min: 0, max: 0, base: 0, curr: 0 };
    this.description = '';
    this.offRoad = false;
    this.crew = 1;
    this.passengers = 0;
    this.cargo = '0';
    this.manuever = { curr: 0, cost: 1 };
    this.weapons = new MaxMetalWeaponList();
    this.mass = { base: 0, value: '0 tons', curr: 0 };
    this.cost = 0;
    this.options = new MaxMetalVehOptList();
  }

  /**
   * Get the number of available spaces to fill
   *
   * @readonly
   * @type {number}
   * @memberof MaxMetalVehicle
   */
  get availableSpaces(): number {
    let spaces = this.sdp.maxSpaces;
    // lose 5% of spaces for each 10% of speed over base pg 14
    let spdCost = 0;
    // gain 10% of space lowering top speed, pg 14
    if (this.speed.curr < this.speed.base) {
      const spdFactor = Math.ceil((1 - this.speed.curr / this.speed.base) * 10);
      spdCost = Math.ceil(spdFactor * 0.2 * spaces) / 2; // round to nearest .5
    }
    spaces += spdCost;
    // range modifies the space available.
    const rngFactor = (this.range.curr / this.range.base) * 100;
    if (rngFactor < 100) {
      // add 10% of space for each 33% decrease in range.
    }
    return spaces - this.usedSpaces;
  }

  get usedSpaces(): number {
    let spaces = 0;
    // lose 5% of spaces for each 10% of speed over base pg 14
    let spdCost = 0;
    if (this.speed.curr > this.speed.base) {
      const spdFactor = Math.floor((this.speed.curr / this.speed.base - 1) * 10);
      spdCost = (Math.ceil(spdFactor * 0.1 * spaces ) / 2); // round to nearest .5
    }
    spaces += spdCost;
    // range modifies the space available.
    const rngFactor = (this.range.curr / this.range.base) * 100;
    if (rngFactor > 100) {
      // lose 10% of space for each 33% increase in range.
    }
    spaces += this.weapons.calculateSpace();
    spaces += this.options.calculateSpace(this.maxSpaces);
    spaces += (this.crew - 1);
    spaces += this.passengers;
    return spaces;
  }

  /**
   * Get the maximum number of spaces vehicle can have.
   *
   * @readonly
   * @type {number}
   * @memberof MaxMetalVehicle
   */
  get maxSpaces(): number {
    return this.sdp.maxSpaces;
  }

  get baseCost(): number {
    return this.sdp.totalCost;
  }

  /**
   * sets the current vehicles type. This will also set up the initial
   * current vehicle's properties.
   * @param {VehicleType} type
   * @memberof MaxmetalService
   */
  setVehicleType(type: VehicleType) {
    this.type = type;
    // set the sdp properties.
    this.sdp.setTypeValues(type);

    // set the armor properties
    this.calculateSP();
    // set the top speed
    this.speed.calculateSpeed(type, this.sp.spdMod);
    this.speed.setSpeed(type);

    // set the range
    this.range = {
      min: Math.round(type.range * 0.01),
      max: Math.round(type.range * 4.30),
      base: type.range,
      curr: type.range
    };
    // set the initial mass
    this.calculateMass();
    this.calculateCost();
  }

  calculate() {
    this.calculateSP();
    this.speed.calculateSpeed(this.type, this.sp.spdMod);
    this.calculateMass();
    this.calculateCost();
  }

  /**
   * change the value of the current vehicle's SDP and then
   * calculates all the other properties associated with that change.
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeSDP(value: number) {
    this.sdp.changeSDP(value);
    this.calculate();
  }

  /**
   * Update the Extra SDP for the vehicle and recalculate.
   * @param {number} value
   * @memberof MaxmetalService
   */
  changeExtraSDP(value: number) {
    this.sdp.changeExtraSDP(value);
    this.calculate();
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
    // only change if the value is within range.
    if (this.type.name.toUpperCase() !== 'AIRSHIP') {
      this.sp.curr += value;
      // sp only affects mass if it is 0SP.
      if (this.sp.curr > 0) {
        this.calculateMass();
      }
      // calculate the cost
      if (this.sp.curr > 0 && this.sp.curr < 21) {
        this.sp.cost = this.sp.curr * 500;
      } else if (this.sp.curr > 20 && this.sp.curr < 41) {
        this.sp.cost = this.sp.curr * 1000;
      } else if (this.sp.curr > 40 && this.sp.curr < 61) {
        this.sp.cost = this.sp.curr * 5000;
      } else if (this.sp.curr > 60) {
        this.sp.cost = this.sp.curr * 7000;
      }
      // adjust topspeed
      let spdFactor = Math.floor((this.sp.curr / this.sdp.curr) * 10) / 10;
      if (
        this.type.name.toUpperCase() === 'OSPREY' ||
        this.type.name.toUpperCase().indexOf('HELICOPTER') > -1
      ) {
        // each 10% of SDP in SP
        spdFactor = spdFactor * 2;
      }
      this.sp.spdMod = spdFactor;

      this.speed.calculateSpeed(this.type, this.sp.spdMod);
      this.calculateCost();
    }
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
    this.manuever.curr += value;
    this.manuever.cost = 1 + this.manuever.curr * 0.5;
    this.calculateCost();
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
    this.speed.changeTopSpeed(value);
    this.calculate();
  }

  /**
   * update the acceleration and recalculate the cost.
   */
  changeAcceleration(value: number) {
    this.speed.changeAcceleration(value);
    this.calculateCost();
  }

  /**
   * update the deceleration and recalculate cost
   */
  changeDeceleration(value: number) {
    this.speed.changeDeceleration(value);
    this.calculateCost();
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
    this.range.curr += value;
  }

  changeOffRoad(value: boolean) {}

  changeCrew(value: number): boolean {
    if ( this.availableSpaces >= 1 ) {
      this.crew += value;
      return true;
    }
    return false;
  }

  changePassenger(value: number): boolean {
    if ( this.availableSpaces >= 1 ) {
      this.passengers += value;
      return true;
    }
    return false;
  }

  /**
   * MAX METAL pg 14
   * Ospreys and airplanes can have
   * a maximum SP armor of 1/4 their SDP. Airships can't be armored, an airship
   * gondala can, but the gasbag can't; and the gasbag is hit 90% of the time,
   * unless specifically aiming for the gondala.
   * @memberof MaxmetalService
   */
  calculateSP() {
    // Airships can't be armored.
    if (this.type.name.toUpperCase() === 'AIRSHIP') {
      this.sp.max = 0;
    } else if (
      this.type.name.toUpperCase() === 'OSPREY' ||
      this.type.name.toUpperCase().indexOf('PLANE') > -1
    ) {
      this.sp.max = Math.round(this.sdp.curr * 0.25);
    } else {
      this.sp.max = Math.round(this.sdp.curr * 0.5);
    }
  }


  /**
   * calculate the total cost of the vehicle. The cost values of SDP and armor
   * reside in those methods. Other factors are set on the different object as
   * well.
   * @memberof MaxmetalService
   */
  calculateCost() {
    let cost = 0;
    let multiplier = 1;
    cost = this.sdp.totalCost;
    multiplier = multiplier * this.manuever.cost;
    multiplier = multiplier * this.speed.cost;
    multiplier = multiplier * this.speed.accelerate.cost;
    // off road is a flat cost of 15%
    if (this.offRoad) {
      multiplier = multiplier * 1.15;
    }
    cost = cost * multiplier;
    // armor isn't a multiplier of the sdp cost.
    cost += this.sp.cost;
    cost += this.weapons.calculateCost();
    cost += this.options.calculateCost(this.baseCost);
    this.cost = Math.ceil(cost);
  }

  calculateMass() {
    this.mass.base =
      Math.round(
        this.type.mass.wt * (this.sdp.curr / this.type.mass.sdp) * 100
      ) / 100;
    // if the vehicle has no armor than it is half it's wait.
    if (this.sp.curr < 1) {
      this.mass.base = this.mass.base / 2;
    }
    this.mass.curr = this.mass.base;
    this.mass.value = this.mass.base + ' ' + this.type.mass.unit;
  }

  addWeapon( weapon: MaxMetalWeapon): boolean {
    if (weapon.totalSpaces() <= this.availableSpaces ) {
      this.weapons.addWeapon(weapon);
      this.calculateCost();
      return true;
    }
    return false;
  }

  removeWeapon(weapon: MaxMetalWeapon) {
    this.weapons.removeWeapon(weapon);
    this.calculateCost();
  }


  addOption(option: MaxMetalOption): boolean {
    if (option.calculateSpaces(this.sdp.base) <= this.availableSpaces ) {
      this.options.addOption(option);
      this.calculateCost();
      return true;
    }
    return false;
  }
  removeOption(option: MaxMetalOption) {
    this.options.removeOption(option);
    this.calculateCost();
  }

  toString(): string {
    let output = this.name + '\r\n';
    output += '\r\n' + this.description;
    output += '\r\n   TOP SPEED: ' + this.speed.curr.toLocaleString() + ' MPH';
    output += '\r\n     ACC/DEC: ' + this.speed.accelerate.curr + '/' +  this.speed.decelerate.curr + ' MPH';
    output += '\r\n        CREW: ' + this.crew;
    output += '\r\n       RANGE: ' + this.range.curr.toLocaleString() + ' MILES';
    output += '\r\n  PASSENGERS: ' + this.passengers;
    output += '\r\n       CARGO: ' + this.cargo + ' KG';
    output += '\r\n    MANEUVER: ' + this.manuever.curr;
    output += '\r\n         SDP: ' + this.sdp.curr + '(BODY ' + ')';
    output += '\r\n          SP: ' + this.sp.curr;
    output += '\r\n        TYPE: ' + this.type.name;
    output += '\r\n        MASS: ' + this.mass.curr.toLocaleString() + ' TONS';
    output += '\r\n        COST: ' + this.cost.toLocaleString() + ' EB.';
    output += '\r\n';

    output += '\r\nSpecial Equipment: ';
    this.options.options.forEach( (o, i) => {
      output += o.toString();
      if ( (i + 1) < this.options.options.length) {
        output += ', ';
      }
    });
    output += '\r\n\r\n';

    output += '\r\nWeapons: ';
    this.weapons.weapons.forEach( (w, i) => {
      output += w.toString();
      if ( (i + 1) < this.weapons.weapons.length) {
        output += ', ';
      }
    });
    output += '\r\n\r\n';

    return output;
  }

}
