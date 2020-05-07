import { MaxMetalVehicle } from './max-metal-vehicle';
import { MaxMetalWeapon} from './../weapon';
import { VehicleType } from './vehicle-type';
import { TestBed } from '@angular/core/testing';
import { MaxMetalOption } from './max-metal-option';

describe('MaxMetalVehicle', () => {
  let vehicle: MaxMetalVehicle;
  let vehType: VehicleType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    vehicle = new MaxMetalVehicle();
    vehType = new VehicleType();
    vehType.name = 'Cycle';
    vehType.sdp = { min: 15, max: 30, eb: 100, perSpace: 1};
    vehType.spaces = { min: 15, max: 50};
    vehType.speed = 120;
    vehType.range = 400;
    vehType.mass = { wt: 4, unit: 'kg', sdp: 1};
    vehType.acc = 18;
    vehType.dec = 30;
    vehType.cargoCapacity = 0.33;
  });

  it('should be created', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should set Vehicle Type', () => {
    vehicle.setVehicleType(vehType);
    expect(vehicle.type).toBeTruthy();
    expect(vehicle.sdp.curr).toBe(15);
    expect(vehicle.speed.curr).toBe(120);
    expect(vehicle.range.curr).toBe(400);
    expect(vehicle.cost).toBeTruthy(1500);
  });

  it('should calculate', () => {
    vehicle.setVehicleType(vehType);
    expect(vehicle).toBeTruthy();
  });

  it('should change SDP', () => {
    vehicle.setVehicleType(vehType);
    vehicle.changeSDP(5);
    expect(vehicle.sdp.base).toBeTruthy(20);
    expect(vehicle.sdp.curr).toBeTruthy(20);
    vehicle.changeSDP(50);
    expect(vehicle.sdp.base).toBeTruthy(50);
    expect(vehicle.sdp.curr).toBeTruthy(70);
    vehicle.changeSDP(-70);
    expect(vehicle.sdp.base).toBeTruthy(15);
    expect(vehicle.sdp.curr).toBeTruthy(7);
  });

  it('should change Extra SDP', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should change SP', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should change Handling', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should change Top Speed', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should change Acceleration', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should change Deceleration', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should change Range', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should change OffRoad', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should change Crew', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should change Passenger', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should calculate SP', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should get Base Cost', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should calculate Cost', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should calculate Mass', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should calculate Space', () => {
    expect(vehicle).toBeTruthy();
  });

  it('should add Weapon', () => {
    vehicle.setVehicleType(vehType);
    let spaces = 0;
    for ( let i = 0; i < 5; i++) {
      const wpn = new MaxMetalWeapon();
      wpn.name = 'weapon_' + i;
      wpn.cost = i * 100;
      wpn.spaces = i;
      spaces += i;
      wpn.count = 1;
      wpn.mounting = {name: 'testMount', description: '', availability: '', cost: -1, spacelimit: '1', spaces: 1, wa: '0'};
      vehicle.addWeapon(wpn);
    }
    expect(vehicle.weapons.weapons.length).toBe(5);
    expect(vehicle.cost).toBe(3500); // vehicle + cost of weapons above.
    expect(vehicle.usedSpaces).toBe(spaces); // 5 extra spaces
    const wpn = new MaxMetalWeapon();
    wpn.name = 'weapon_5';
    wpn.count = 1;
    wpn.spaces = 75; // should not have room for this
    wpn.mounting = {name: 'testMount', description: '', availability: '', cost: -1, spacelimit: '1', spaces: 1, wa: '0'};
    vehicle.addWeapon(wpn);
    expect(vehicle.weapons.weapons.length).toBe(5);
    expect(vehicle.usedSpaces).toBe(spaces);
  });

  it('should remove Weapon', () => {
    vehicle.setVehicleType(vehType);
    const wpns = new Array<MaxMetalWeapon>();
    let spaces = 0;
    for ( let i = 0; i < 5; i++) {
      const wpn = new MaxMetalWeapon();
      wpn.name = 'weapon_' + i;
      wpn.cost = i * 100;
      wpn.spaces = i;
      spaces += i;
      wpn.count = 1;
      wpn.mounting = {name: 'testMount', description: '', availability: '', cost: -1, spacelimit: '1', spaces: 1, wa: '0'};
      wpns.push(wpn);
      vehicle.addWeapon(wpn);
    }
    expect(vehicle.weapons.weapons.length).toBe(5);
    vehicle.removeWeapon(wpns[4]);
    vehicle.removeWeapon(wpns[2]);
    expect(vehicle.weapons.weapons.length).toBe(3);
    expect(vehicle.weapons.weapons.some(w => w.name === 'weapon_3')).toBeTruthy();
    vehicle.removeWeapon(wpns[3]);
    vehicle.removeWeapon(wpns[1]);
    vehicle.removeWeapon(wpns[0]);
    expect(vehicle.weapons.weapons.length).toBe(0);
    vehicle.removeWeapon(wpns[0]);
    expect(vehicle.weapons.weapons).toBeTruthy();
  });

  it('should add Option', () => {
    vehicle.setVehicleType(vehType);
    let spaces = 0;
    for ( let i = 0; i < 5; i++) {
      const opt = new MaxMetalOption();
      opt.name = 'option_' + i;
      opt.cost = i * 100;
      spaces += i;
      opt.spaces = `${i}`;
      opt.count = 1;
      vehicle.addOption(opt);
    }
    expect(vehicle.options.options.length).toBe(5);
    expect(vehicle.cost).toBe(2500); // vehicle + cost of weapons above.
    expect(vehicle.usedSpaces).toBe(spaces);
    const opt = new MaxMetalOption();
    opt.name = 'option_';
    opt.count = 1;
    opt.spaces = '75'; // should not have room for this
    vehicle.addOption(opt);
    expect(vehicle.options.options.length).toBe(5);
    expect(vehicle.usedSpaces).toBe(spaces);
  });

  it('should remove Option', () => {
    vehicle.setVehicleType(vehType);
    const opts = new Array<MaxMetalOption>();
    for ( let i = 0; i < 5; i++) {
      const opt = new MaxMetalOption();
      opt.name = 'weapon_' + i;
      opt.cost = i * 100;
      opt.spaces = `${i}`;
      opt.count = 1;
      opts.push(opt);
      vehicle.addOption(opt);
    }
    expect(vehicle.options.options.length).toBe(5);
    vehicle.removeOption(opts[4]);
    vehicle.removeOption(opts[2]);
    expect(vehicle.options.options.length).toBe(3);
    expect(vehicle.options.options.some(w => w.name === 'weapon_3')).toBeTruthy();
    vehicle.removeOption(opts[3]);
    vehicle.removeOption(opts[1]);
    vehicle.removeOption(opts[0]);
    expect(vehicle.options.options.length).toBe(0);
    vehicle.removeOption(opts[0]);
    expect(vehicle.options.options).toBeTruthy();
  });

  it('should to string', () => {
    vehicle.setVehicleType(vehType);
    vehicle.name = 'Test cycle';
    expect(vehicle.toString()).toContain('Test cycle');
    expect(vehicle.toString().toLowerCase()).toContain('cycle');
    expect(vehicle.toString().toLowerCase()).toContain('top speed: 120 mph');
    expect(vehicle.toString().toLowerCase()).toContain('cost: 1,500 eb.');
  });
});
