import { MaxMetalVehSpeed } from './max-metal-veh-speed';
import { VehicleType } from './vehicle-type';
import { TestBed } from '@angular/core/testing';

describe('MaxMetalVehSpeed', () => {
  let speed: MaxMetalVehSpeed;
  let vehType: VehicleType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
    speed = new MaxMetalVehSpeed(vehType);
  });

  it('should be created', () => {
    expect(speed).toBeTruthy();
  });

  it('should set speed', () => {
    speed.setSpeed(vehType);
    const vehType2 = new VehicleType();
    vehType2.name = 'Cycle';
    vehType2.sdp = { min: 15, max: 30, eb: 100, perSpace: 1};
    vehType2.spaces = { min: 15, max: 50};
    vehType2.speed = 100;
    vehType2.range = 400;
    vehType2.mass = { wt: 4, unit: 'kg', sdp: 1};
    vehType2.acc = 10;
    vehType2.dec = 20;
    vehType2.cargoCapacity = 0.33;
    speed.setSpeed(vehType2);
    expect(speed.decelerate.base).toBe(20);
    expect(speed.accelerate.base).toBe(10);
    expect(speed.curr).toBe(100);
  });

  it('should calculate Speed', () => {
    expect(speed.base).toBe(120);
    expect(speed.max).toBe(240);
    expect(speed.min).toBe(12);
    expect(speed.costModifier).toBe(1);
  });

  it('should change Top Speed', () => {
    speed.changeTopSpeed(100);
    expect(speed.curr).toBe(220);
    speed.changeTopSpeed(100);
    expect(speed.curr).toBe(240);
    speed.changeTopSpeed(-220);
    expect(speed.curr).toBe(20);
    speed.changeTopSpeed(-20);
    expect(speed.curr).toBe(12);
  });

  it('should change Top Speed with SP', () => {
    speed.spMod = 0;
    expect(speed.curr).toBe(120);
    speed.spMod = .8;
    expect(speed.curr).toBe(96);
    speed.spMod = .5;
    expect(speed.base).toBe(60);
  });

  it('should change Acceleration', () => {
    speed.setSpeed(vehType);
    speed.changeAcceleration(10);
    expect(speed.accelerate.curr).toBe(28);
    speed.changeAcceleration(50);
    expect(speed.accelerate.curr).toBe(36);
    speed.changeAcceleration(-70);
    expect(speed.accelerate.curr).toBe(18);
  });

  it('should change Deceleration', () => {
    speed.setSpeed(vehType);
    speed.changeDeceleration(10);
    expect(speed.decelerate.curr).toBe(40);
    speed.changeDeceleration(50);
    expect(speed.decelerate.curr).toBe(60);
    speed.changeDeceleration(-70);
    expect(speed.decelerate.curr).toBe(30);
  });
});
