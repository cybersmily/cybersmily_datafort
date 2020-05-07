import { MaxMetalVehOptList } from './max-metal-veh-opt-list';
import { MaxMetalOption } from './max-metal-option';
import { MaxMetalVehicle } from './max-metal-vehicle';
import { VehicleType } from './vehicle-type';
import { TestBed } from '@angular/core/testing';

describe('MaxMetalOptList', () => {
  let optList: MaxMetalVehOptList;
  let opt1: MaxMetalOption;
  let opt2: MaxMetalOption;
  let vehicle: MaxMetalVehicle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    optList = new MaxMetalVehOptList();
    opt1 = new MaxMetalOption();
    opt1.type = 'Electronics';
    opt1.name = 'option1';
    opt1.spaces = '2';
    opt1.cost = 500;
    opt1.calcCost = 0;
    opt1.mass = '50kg';
    opt1.avail = 'P';
    opt1.source = {book: 'Max Metal', page: 50};
    opt1.notes = '';
    opt1.count = 1;

    opt2 = new MaxMetalOption();
    opt2.type = 'Communication';
    opt2.name = 'option2';
    opt2.spaces = '0.5*b';
    opt2.cost = '0.5*b';
    opt2.calcCost = 0;
    opt2.mass = '200';
    opt2.avail = 'C';
    opt2.source = {book: 'Max Metal', page: 50};
    opt2.notes = 'Testing';
    opt2.count = 4;
    // create test vehicle
    const vehType = new VehicleType();
    vehType.name = 'Cycle';
    vehType.sdp = { min: 15, max: 30, eb: 100, perSpace: 1};
    vehType.spaces = { min: 15, max: 50};
    vehType.speed = 120;
    vehType.range = 400;
    vehType.mass = { wt: 4, unit: 'kg', sdp: 1};
    vehType.acc = 18;
    vehType.dec = 30;
    vehType.cargoCapacity = 0.33;
    vehicle = new MaxMetalVehicle();
    vehicle.setVehicleType(vehType);
  });

  it('should be created', () => {
    expect(optList).toBeTruthy();
  });

  it('should add options', () => {
    optList.addOption(opt1);
    optList.addOption(opt1);
    optList.addOption(opt1);
    optList.addOption(opt2);
    expect(optList.options.length === 2).toBeTruthy(optList.options.length);
    expect(optList.options.some(o => o.name === 'option1')).toBeTruthy(optList.options);
    const opt = optList.options.filter(o => o.name === 'option1');
    expect(opt.length === 1).toBeTruthy(opt);
    expect(opt[0].count === 3).toBeTruthy(opt);
  });

  it('should remove options', () => {
    optList.addOption(opt1);
    optList.addOption(opt2);
    optList.addOption(opt2);
    optList.addOption(opt2);
    optList.addOption(opt2);
    optList.removeOption(opt1);
    optList.removeOption(opt2);
    optList.removeOption(opt2);
    expect(optList.options.length === 1).toBeTruthy(optList.options.length);
    expect(!optList.options.some(o => o.name === 'option1')).toBeTruthy(optList.options);
    const opt = optList.options.filter(o => o.name === 'option2');
    expect(opt.length === 1).toBeTruthy(opt);
    expect(opt[0].count === 2).toBeTruthy(opt);
  });

  it('should be calculate cost', () => {
    optList.addOption(opt1); // 500 each
    optList.addOption(opt1);
    optList.addOption(opt1);
    optList.addOption(opt2); // 0.5*b = 750
    expect(optList.calculateCost(vehicle.baseCost)).toBe(2250, optList.calculateCost(vehicle.baseCost));
    optList.removeOption(opt2);
    expect(optList.calculateCost(vehicle.baseCost)).toBe(1500, optList.calculateCost(vehicle.baseCost));
  });

  it('should be calculate spaces', () => {
    optList.addOption(opt1); // 2 spaces each
    optList.addOption(opt1);
    optList.addOption(opt1);
    optList.addOption(opt2); // 0.5*b
    expect(optList.calculateSpace(vehicle.maxSpaces)).toBe(13.5, optList.calculateSpace(vehicle.maxSpaces));
    optList.removeOption(opt2);
    expect(optList.calculateSpace(vehicle.maxSpaces)).toBe(6, optList.calculateSpace(vehicle.maxSpaces));
  });
});
