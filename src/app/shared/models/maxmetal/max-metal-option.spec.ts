import { MaxMetalVehicle } from './max-metal-vehicle';
import { MaxMetalVehOptList } from './max-metal-veh-opt-list';
import { MaxMetalOption } from './max-metal-option';
import { VehicleType } from './vehicle-type';
import { TestBed } from '@angular/core/testing';

describe('MaxMetalOption', () => {
  let opt1: MaxMetalOption;
  let opt2: MaxMetalOption;
  let vehicle: MaxMetalVehicle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
    expect(opt1).toBeTruthy();
    expect(opt2).toBeTruthy();
  });

  it('should clone', () => {
    const opt3 = opt1.clone();
    expect(opt1.name === opt3.name).toBeTruthy();
    expect(opt1.cost === opt3.cost).toBeTruthy();
  });

  it('should copy', () => {
    opt1.copy(opt2);
    expect(opt1.name === opt2.name).toBeTruthy();
    expect(opt1.cost === opt2.cost).toBeTruthy();
    expect(opt1.spaces === opt2.spaces).toBeTruthy();
  });

  it('should calculate cost', () => {
    let cost = opt1.calculateCost(vehicle);
    expect(cost === 500).toBeTruthy(cost);
    cost = opt2.calculateCost(vehicle);
    expect(cost === 3000).toBeTruthy(cost);
  });

  it('should calculate spaces', () => {
    let spaces = opt1.calculateSpaces(vehicle);
    expect(spaces === 2).toBeTruthy(spaces);
    spaces = opt2.calculateSpaces(vehicle);
    expect(spaces === 30).toBeTruthy(spaces);
  });

  it('should convert to string', () => {
    expect(opt1.toString() !== '').toBeTruthy();
    expect(opt1.toString().includes(opt1.name)).toBeTruthy();
  });


});
