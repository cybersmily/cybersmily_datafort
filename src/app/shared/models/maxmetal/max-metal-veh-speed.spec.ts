import { MaxMetalVehSpeed } from './max-metal-veh-speed';
import { VehicleType } from './vehicle-type';
import { TestBed } from '@angular/core/testing';

describe('MaxMetalVehSpeed', () => {
  let speed: MaxMetalVehSpeed;
  let vehType: VehicleType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    speed = new MaxMetalVehSpeed();
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
    expect(speed).toBeTruthy();
  });

  it('should set speed', () => {
    speed.setSpeed(vehType);
    expect(speed.decelerate.base === 30).toBeTruthy(speed);
    expect(speed.accelerate.base === 18).toBeTruthy(speed);
  });

  it('should calculate Speed', () => {
    speed.calculateSpeed(vehType, 0);
    expect(speed.base === 120).toBeTruthy();
    expect(speed.max === 240).toBeTruthy();
    expect(speed.min === 12).toBeTruthy();
    expect(speed.cost === 1).toBeTruthy();
  });

  it('should change Top Speed', () => {
    speed.calculateSpeed(vehType, 0);
    speed.changeTopSpeed(100);
    expect(speed.curr === 220).toBeTruthy(speed);
    speed.changeTopSpeed(100);
    expect(speed.curr === 240).toBeTruthy(speed);
    speed.changeTopSpeed(-220);
    expect(speed.curr === 20).toBeTruthy(speed);
    speed.changeTopSpeed(-20);
    expect(speed.curr === 12).toBeTruthy(speed);
  });

  it('should change Acceleration', () => {
    speed.setSpeed(vehType);
    speed.changeAcceleration(10);
    expect(speed.accelerate.curr === 28).toBeTruthy(speed.accelerate);
    speed.changeAcceleration(50);
    expect(speed.accelerate.curr === 36).toBeTruthy(speed.accelerate);
    speed.changeAcceleration(-70);
    expect(speed.accelerate.curr === 18).toBeTruthy(speed.accelerate);
  });

  it('should change Deceleration', () => {
    speed.setSpeed(vehType);
    speed.changeDeceleration(10);
    expect(speed.decelerate.curr === 40).toBeTruthy(speed.decelerate);
    speed.changeDeceleration(50);
    expect(speed.decelerate.curr === 60).toBeTruthy(speed.decelerate);
    speed.changeDeceleration(-70);
    expect(speed.decelerate.curr === 30).toBeTruthy(speed.decelerate);
  });
});
