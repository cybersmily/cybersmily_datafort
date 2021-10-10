import { MaxMetalVehicle } from './max-metal-vehicle';
import { MaxMetalWeapon} from './../../cp2020weapons/models';
import { VehicleType } from './vehicle-type';
import { TestBed } from '@angular/core/testing';
import { MaxMetalOption } from './max-metal-option';

describe('MaxMetalVehicle', () => {
  let car: MaxMetalVehicle;
  let mbt: MaxMetalVehicle;
  let carType: VehicleType;
  let mbtType: VehicleType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    car = new MaxMetalVehicle();
    mbt = new MaxMetalVehicle();
    carType = new VehicleType();
    carType.name = 'Car';
    carType.sdp = { min: 25, max: 80, eb: 250, perSpace: 8};
    carType.spaces = { min: 3, max: 10};
    carType.speed = 100;
    carType.range = 300;
    carType.mass = { wt: 1, unit: 'ton', sdp: 25};
    carType.acc = 15;
    carType.dec = 40;
    carType.cargoCapacity = 0.33;
    mbtType = new VehicleType();
    mbtType.name = 'MBT';
    mbtType.sdp = { min: 200, max: 600, eb: 3000, perSpace: 4};
    mbtType.spaces = { min: 50, max: 160};
    mbtType.speed = 40;
    mbtType.range = 200;
    mbtType.mass = { wt: 1, unit: 'ton', sdp: 6};
    mbtType.acc = 10;
    mbtType.dec = 50;
    mbtType.cargoCapacity = 0.33;
  });

  it('should be created', () => {
    expect(car).toBeTruthy();
  });

  it('should set Vehicle Type', () => {
    car.setVehicleType(carType);
    expect(car.type).toBeTruthy();
    expect(car.sdp.curr).toBe(25);
    expect(car.speed.curr).toBe(100);
    expect(car.range.curr).toBe(300);
    expect(car.cost).toBeTruthy(6250);
  });

  it('should change SDP', () => {
    car.setVehicleType(carType);
    car.changeSDP(5);
    expect(car.sdp.base).toBeTruthy(30);
    expect(car.sdp.curr).toBeTruthy(30);
    car.changeSDP(60);
    expect(car.sdp.base).toBeTruthy(80);
    expect(car.sdp.curr).toBeTruthy(90);
    car.changeSDP(60);
    expect(car.sdp.base).toBeTruthy(80);
    expect(car.sdp.curr).toBeTruthy(100);
    car.changeSDP(-170);
    expect(car.sdp.base).toBeTruthy(25);
    expect(car.sdp.curr).toBeTruthy(13);
  });

  it('should change  Extra SDP for max', () => {
    car.setVehicleType(carType);
    // shouldn't add until sdp is maxed
    car.changeExtraSDP(5);
    expect(car.sdp.curr).toBe(25);
    expect(car.sdp.adjusted.curr).toBe(0);
    // max sdp then add
    car.changeSDP(55);
    car.changeExtraSDP(5);
    expect(car.sdp.curr).toBe(85);
    expect(car.sdp.adjusted.curr).toBe(5);
    car.changeExtraSDP(50);
    expect(car.sdp.curr).toBe(100);
    expect(car.sdp.adjusted.curr).toBe(20);
    car.changeExtraSDP(-10);
    expect(car.sdp.curr).toBe(90);
    expect(car.sdp.adjusted.curr).toBe(10);
    car.changeExtraSDP(-20);
    expect(car.sdp.curr).toBe(80);
    expect(car.sdp.adjusted.curr).toBe(0);
  });

  it('should change  Extra SDP for max', () => {
    car.setVehicleType(carType);
    car.changeExtraSDP(-5);
    expect(car.sdp.curr).toBe(20);
    expect(car.sdp.adjusted.curr).toBe(-5);
    car.changeExtraSDP(-10);
    expect(car.sdp.curr).toBe(13);
    expect(car.sdp.adjusted.curr).toBe(-12);
    car.changeExtraSDP(7);
    expect(car.sdp.curr).toBe(20);
    expect(car.sdp.adjusted.curr).toBe(-5);
    car.changeExtraSDP(7);
    expect(car.sdp.curr).toBe(25);
    expect(car.sdp.adjusted.curr).toBe(0);
  });


  it('should change Handling', () => {
    car.setVehicleType(carType);
    car.changeHandling(1);
    expect(car.manuever.curr).toBe(1);
    expect(car.manuever.cost).toBe(1.5);
    expect(car.cost).toBe(9375);
    car.changeHandling(2);
    expect(car.manuever.curr).toBe(3);
    expect(car.manuever.cost).toBe(2.5);
    expect(car.cost).toBe(15625);
    car.changeHandling(1);
    expect(car.manuever.curr).toBe(3);
    expect(car.manuever.cost).toBe(2.5);
    car.changeHandling(-4);
    expect(car.manuever.curr).toBe(0);
    expect(car.manuever.cost).toBe(1);
  });

  it('should lower Top Speed', () => {
    car.setVehicleType(carType);
    expect(car.speed.curr).toBe(100);
    expect(car.speed.max).toBe(200);
    expect(car.speed.min).toBe(10);
    car.changeTopSpeed(-100);
    expect(car.speed.curr).toBe(10);
    expect(car.maxSpaces).toBe(8);
    expect(car.speed.costModifier).toBe(0.1);
  });

  it('should increase Top Speed', () => {
    car.setVehicleType(carType);
    expect(car.speed.curr).toBe(100);
    expect(car.speed.max).toBe(200);
    expect(car.speed.min).toBe(10);
    car.changeTopSpeed(150);
    expect(car.speed.curr).toBe(200);
    expect(car.maxSpaces).toBe(2);
    expect(car.speed.costModifier).toBe(3.5);
  });

  it('should change Acceleration', () => {
    car.setVehicleType(carType);
    expect(car.speed.accelerate.curr).toBe(15);
    car.changeAcceleration(-5);
    expect(car.speed.accelerate.curr).toBe(15);
    car.changeAcceleration(5);
    expect(car.speed.accelerate.curr).toBe(20);
    car.changeAcceleration(15);
    expect(car.speed.accelerate.curr).toBe(30);
  });

  it('should change Deceleration', () => {
    car.setVehicleType(carType);
    expect(car.speed.decelerate.curr).toBe(40);
    car.changeDeceleration(-5);
    expect(car.speed.decelerate.curr).toBe(40);
    car.changeDeceleration(10);
    expect(car.speed.decelerate.curr).toBe(50);
    car.changeDeceleration(40);
    expect(car.speed.decelerate.curr).toBe(80);
  });

  it('should change Range', () => {
    car.setVehicleType(carType);
    expect(car.range.curr).toBe(300);
    expect(car.range.min).toBe(3);
    car.changeRange(495); // reduce spaces by 50%
    expect(car.range.curr).toBe(795);
    expect(car.maxSpaces).toBe(2);
    car.setVehicleType(carType);
    car.changeRange(-99); // increase space
    expect(car.range.curr).toBe(201);
    expect(car.maxSpaces).toBe(4.4);
    car.changeRange(-99); // increase space
    expect(car.range.curr).toBe(102);
    expect(car.maxSpaces).toBe(4.8);
    car.changeRange(-99); // increase space
    expect(car.range.curr).toBe(3);
    expect(car.maxSpaces).toBe(5.2);
    car.changeRange(-99); // increase space
    expect(car.range.curr).toBe(3);
  });

  it('should change OffRoad', () => {
    car.setVehicleType(carType);
    car.toggleOffRoad();
    expect(car.totalCost).toBe(7188);
  });

  it('should change Crew', () => {
    car.setVehicleType(carType);
    car.changeCrew(1);
    expect(car.crew).toBe(2);
    expect(car.availableSpaces).toBe(3);
    car.changeCrew(-2);
    expect(car.crew).toBe(1);
    expect(car.availableSpaces).toBe(4);
  });

  it('should change Passenger', () => {
    car.setVehicleType(carType);
    car.changePassenger(1);
    expect(car.passengers).toBe(1);
    expect(car.availableSpaces).toBe(3);
    car.changePassenger(-2);
    expect(car.passengers).toBe(0);
    expect(car.availableSpaces).toBe(4);
  });

  it('should change and calculate SP', () => {
    mbt.setVehicleType(mbtType);
    mbt.changeSP(2);
    expect(mbt.sp.curr).toBe(2);
    expect(mbt.speed.spMod).toBe(.9);
    expect(mbt.sp.cost).toBe(1000);
    mbt.changeSP(25);
    expect(mbt.sp.curr).toBe(27);
    expect(mbt.speed.spMod).toBe(.8);
    expect(mbt.sp.cost).toBe(27000);
    mbt.changeSP(23);
    expect(mbt.sp.curr).toBe(50);
    expect(mbt.speed.spMod).toBe(.7);
    expect(mbt.sp.cost).toBe(250000);
    mbt.changeSP(40);
    expect(mbt.sp.curr).toBe(90);
    expect(mbt.speed.spMod).toBe(.5);
    expect(mbt.sp.cost).toBe(630000);
    mbt.changeSP(20);
    expect(mbt.sp.curr).toBe(100);
    expect(mbt.speed.spMod).toBe(.5);
    expect(mbt.sp.cost).toBe(700000);
    expect(mbt.speed.base).toBe(20);
    mbt.changeSP(-300);
    expect(mbt.sp.curr).toBe(0);
    expect(mbt.sp.cost).toBe(0);
  });

  it('should get Base Cost', () => {
    car.setVehicleType(carType);
    expect(car.baseCost).toBe(6250);
    car.changeSDP(80);
    expect(car.baseCost).toBe(20000);
    car.changeExtraSDP(20);
    expect(car.baseCost).toBe(30000);
    car.changeHandling(2);
    expect(car.baseCost).toBe(30000);
  });

  it('should calculate Cost', () => {
    car.setVehicleType(carType);
    expect(car).toBeTruthy();
  });

  it('should calculate Space', () => {
    car.setVehicleType(carType);
    expect(car).toBeTruthy();
  });

  it('should calculate Mass', () => {
    car.setVehicleType(carType);
    expect(car.mass).toBe(1);
    car.changeSDP(55);
    expect(car.mass).toBe(3.2);
  });


  it('should add Weapon', () => {
    car.setVehicleType(carType);
    let spaces = 0;
    for ( let i = 0; i < 5; i++) {
      const wpn = new MaxMetalWeapon();
      wpn.name = 'weapon_' + i;
      wpn.cost = i * 100;
      wpn.spaces = i;
      wpn.count = 1;
      wpn.mounting = {name: 'testMount', description: '', availability: '', cost: -1, spacelimit: '1', spaces: 1, wa: '0'};
      if (car.addWeapon(wpn)) {
        spaces += i;
      }
    }
    expect(car.weapons.weapons.length).toBe(3);
    expect(car.cost).toBe(6850); // vehicle + cost of weapons above.
    expect(car.usedSpaces).toBe(spaces); // 5 extra spaces
    const wpn = new MaxMetalWeapon();
    wpn.name = 'weapon_1';
    wpn.count = 1;
    wpn.spaces = 75; // should not have room for this
    wpn.mounting = {name: 'testMount', description: '', availability: '', cost: -1, spacelimit: '1', spaces: 1, wa: '0'};
    car.addWeapon(wpn);
    expect(car.weapons.weapons.length).toBe(3);
    expect(car.usedSpaces).toBe(spaces);
  });

  it('should remove Weapon', () => {
    car.setVehicleType(carType);
    const wpns = new Array<MaxMetalWeapon>();
    let spaces = 0;
    for ( let i = 0; i < 3; i++) {
      const wpn = new MaxMetalWeapon();
      wpn.name = 'weapon_' + i;
      wpn.cost = i * 100;
      wpn.spaces = i;
      wpn.count = 1;
      wpn.mounting = {name: 'testMount', description: '', availability: '', cost: -1, spacelimit: '1', spaces: 1, wa: '0'};
      wpns.push(wpn);
      if (car.addWeapon(wpn)) {
        spaces += i;
      }
    }
    expect(car.weapons.weapons.length).toBe(3);
    car.removeWeapon(wpns[2]);
    expect(car.weapons.weapons.length).toBe(2);
    expect(car.weapons.weapons.some(w => w.name === 'weapon_1')).toBeTruthy();
    car.removeWeapon(wpns[1]);
    car.removeWeapon(wpns[0]);
    expect(car.weapons.weapons.length).toBe(0);
    car.removeWeapon(wpns[0]);
    expect(car.weapons.weapons).toBeTruthy(car.weapons.weapons);
  });

  it('should add Option', () => {
    car.setVehicleType(carType);
    let spaces = 0;
    for ( let i = 0; i < 4; i++) {
      const opt = new MaxMetalOption();
      opt.name = 'option_' + i;
      opt.cost = i * 100;
      opt.spaces = `${i}`;
      opt.count = 1;
      if (car.addOption(opt)) {
        spaces += i;
      }
    }
    expect(car.options.options.length).toBe(3);
    expect(car.cost).toBe(6550); // vehicle + cost of weapons above.
    expect(car.usedSpaces).toBe(spaces);
    const opt = new MaxMetalOption();
    opt.name = 'option_';
    opt.count = 1;
    opt.spaces = '75'; // should not have room for this
    car.addOption(opt);
    expect(car.options.options.length).toBe(3);
    expect(car.usedSpaces).toBe(spaces);
  });

  it('should remove Option', () => {
    car.setVehicleType(carType);
    const opts = new Array<MaxMetalOption>();
    for ( let i = 0; i < 3; i++) {
      const opt = new MaxMetalOption();
      opt.name = 'option_' + i;
      opt.cost = i * 100;
      opt.spaces = `${i}`;
      opt.count = 1;
      opts.push(opt);
      car.addOption(opt);
    }
    expect(car.options.options.length).toBe(3);
    car.removeOption(opts[2]);
    expect(car.options.options.length).toBe(2);
    expect(car.options.options.some(w => w.name === 'option_1')).toBeTruthy();
    car.removeOption(opts[1]);
    car.removeOption(opts[0]);
    expect(car.options.options.length).toBe(0);
    car.removeOption(opts[0]);
    expect(car.options.options).toBeTruthy();
  });

  it('should to string', () => {
    car.setVehicleType(carType);
    car.name = 'Test cycle';
    expect(car.toString().toLowerCase()).toContain('test cycle');
    expect(car.toString().toLowerCase()).toContain('car');
    expect(car.toString().toLowerCase()).toContain('top speed: 100 mph');
    expect(car.toString().toLowerCase()).toContain('1 ton');
    expect(car.toString().toLowerCase()).toContain('cost: 6,250 eb.');
  });
});
