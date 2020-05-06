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
    expect(sdp).toBeTruthy();
  });

  it('should set type value', () => {
    sdp.setTypeValues(vehType);
    expect(sdp.base === 15).toBeTruthy(sdp);
    expect(sdp.min === 15).toBeTruthy(sdp);
    expect(sdp.max === 30).toBeTruthy(sdp);
    expect(sdp.curr === 15).toBeTruthy(sdp);
  });

  it('should change sdp', () => {
    sdp.setTypeValues(vehType);
    sdp.changeSDP(15);
    expect(sdp.base === 30).toBeTruthy(sdp);
    expect(sdp.curr === 30).toBeTruthy(sdp);
    sdp.changeSDP(-20);
    expect(sdp.base === 15).toBeTruthy(sdp);
    expect(sdp.curr === 10).toBeTruthy(sdp);
  });

  it('should calculate adjusted sdp', () => {
    sdp.calculateAdjSDP(vehType);
    expect(sdp.adjusted.min === -7).toBeTruthy(sdp.adjusted);
    expect(sdp.adjusted.max === 8).toBeTruthy(sdp.adjusted);
    expect(sdp.adjusted.base === 0).toBeTruthy(sdp.adjusted);
    expect(sdp.adjusted.curr === 0).toBeTruthy(sdp.adjusted);
  });

  it('should change extra sdp to minimum', () => {
    sdp.setTypeValues(vehType);
    sdp.calculateAdjSDP(vehType);
    sdp.changeExtraSDP(-5);
    expect(sdp.curr === 10).toBeTruthy(sdp);
    expect(sdp.adjusted.curr === -5).toBeTruthy(sdp);
    sdp.changeExtraSDP(-5);
    expect(sdp.curr === 8).toBeTruthy(sdp);
    expect(sdp.adjusted.curr === -7).toBeTruthy(sdp);
  });

  it('should change extra sdp to maximum', () => {
    sdp.setTypeValues(vehType);
    sdp.changeSDP(15);
    sdp.calculateAdjSDP(vehType);
    expect(sdp.curr === 30).toBeTruthy(sdp);
    expect(sdp.adjusted.curr === 0).toBeTruthy(sdp);
    sdp.changeExtraSDP(8);
    expect(sdp.curr === 38).toBeTruthy(sdp);
    expect(sdp.adjusted.curr === 8).toBeTruthy(sdp);
    // add 8 more to go over max
    sdp.changeExtraSDP(8);
    expect(sdp.curr === 38).toBeTruthy(sdp);
    expect(sdp.adjusted.curr === 8).toBeTruthy(sdp);
  });

});
