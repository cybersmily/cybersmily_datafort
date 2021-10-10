import { MaxMetalVehSdp } from './max-metal-veh-sdp';
import { VehicleType } from './vehicle-type';
import { TestBed } from '@angular/core/testing';

describe('MaxMetalVehSdp', () => {
  let sdp: MaxMetalVehSdp;
  let vehType: VehicleType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    sdp = new MaxMetalVehSdp();
    vehType = new VehicleType();
    vehType.name = 'Cycle';
    sdp.min = 15;
    sdp.max = 30;
    sdp.eb = 100;
    sdp.perSpace = 1;
    vehType.sdp = sdp;
    vehType.spaces = { min: 15, max: 50};
    vehType.speed = 120;
    vehType.range = 400;
    vehType.mass = { wt: 4, unit: 'kg', sdp: 1};
    vehType.acc = 18;
    vehType.dec = 30;
    vehType.cargoCapacity = 0.33;
  });

  it('should be created', () => {
    expect(sdp).toBeTruthy();
  });

  it('should set type value', () => {
    sdp.setTypeValues(vehType);
    expect(sdp.base).toBe(15);
    expect(sdp.min).toBe(15);
    expect(sdp.max).toBe(30);
    expect(sdp.curr).toBe(15);
    expect(sdp.baseCost).toBe(1500);
    expect(sdp.totalCost).toBe(1500);
    expect(sdp.adjusted.min).toBe(-7);
    expect(sdp.adjusted.max).toBe(4);
    expect(sdp.adjusted.base).toBe(0);
    expect(sdp.adjusted.curr).toBe(0);
    expect(sdp.maxSpaces).toBe(15);
  });

  it('should change sdp', () => {
    sdp.setTypeValues(vehType);
    sdp.changeSDP(15); // add value within range
    expect(sdp.base).toBe(30);
    expect(sdp.curr).toBe(30);
    expect(sdp.baseCost).toBe(3000);
    expect(sdp.totalCost).toBe(3000);
    expect(sdp.maxSpaces).toBe(30);
    sdp.changeSDP(-30); // go below min
    expect(sdp.base).toBe(15);
    expect(sdp.curr).toBe(15);
    expect(sdp.maxSpaces).toBe(15);
    expect(sdp.baseCost).toBe(1500);
    expect(sdp.totalCost).toBe(1500);
    sdp.changeSDP(50); // go over max
    expect(sdp.base).toBe(30);
    expect(sdp.curr).toBe(30);
    expect(sdp.maxSpaces).toBe(30);
    expect(sdp.baseCost).toBe(3000);
    expect(sdp.totalCost).toBe(3000);
  });


  it('should change extra sdp to minimum', () => {
    sdp.setTypeValues(vehType);
    sdp.changeExtraSDP(-5);
    expect(sdp.curr).toBe(10);
    expect(sdp.base).toBe(15);
    expect(sdp.adjusted.curr).toBe(-5);
    expect(sdp.baseCost).toBe(1500);
    expect(sdp.totalCost).toBe(1000);
    expect(sdp.maxSpaces).toBe(15);
    sdp.changeExtraSDP(-5);
    expect(sdp.curr).toBe(8);
    expect(sdp.base).toBe(15);
    expect(sdp.adjusted.curr).toBe(-7);
    expect(sdp.baseCost).toBe(1500);
    expect(sdp.totalCost).toBe(800);
    expect(sdp.maxSpaces).toBe(15);
  });

  it('should change extra sdp to maximum', () => {
    sdp.setTypeValues(vehType);
    sdp.changeSDP(15); // max out Sdp
    expect(sdp.curr).toBe(30, 'curr sdp');
    expect(sdp.base).toBe(30, 'base sdp');
    expect(sdp.adjusted.curr).toBe(0);
    expect(sdp.baseCost).toBe(3000);
    expect(sdp.totalCost).toBe(3000);
    expect(sdp.maxSpaces).toBe(30, 'maxspaces');

    sdp.changeExtraSDP(8); // add extra sdp
    expect(sdp.curr).toBe(38, 'curr sdp');
    expect(sdp.base).toBe(30, 'base sdp');
    expect(sdp.adjusted.curr).toBe(8);
    expect(sdp.baseCost).toBe(3000);
    expect(sdp.totalCost).toBe(4600);
    expect(sdp.maxSpaces).toBe(30, 'maxspaces');

    // add 8 more to go over max
    sdp.changeExtraSDP(8);
    expect(sdp.curr).toBe(38, 'curr sdp');
    expect(sdp.base).toBe(30, 'base sdp');
    expect(sdp.adjusted.curr).toBe(8);
    expect(sdp.baseCost).toBe(3000);
    expect(sdp.totalCost).toBe(4600);
    expect(sdp.maxSpaces).toBe(30, 'maxspaces');
  });

});
