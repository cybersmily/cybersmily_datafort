import { VehicleType, MaxMetalVehSdp } from '../../models/maxmetal';
import { TestBed, inject } from '@angular/core/testing';

import { MaxmetalService } from './maxmetal.service';


describe('MaxmetalService', () => {
  const vehicleType: VehicleType = {
    name: 'test',
    sdp: {
      min: 10,
      max: 40,
      perSpace: 1,
      eb: 100
    },
    spaces: {min: 1, max: 5 },
    speed: 50,
    range: 100,
    mass: {wt: 100, unit: 'tons', sdp: 100},
    dec: 2,
    acc: 5,
    offroad: false,
    massRating: 100,
    cargoCapacity: 100,
    capacityIncrease: 50,
    isAirVehicle: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaxmetalService]
    });
  });

  it('should be created', inject([MaxmetalService], (service: MaxmetalService) => {
    expect(service).toBeTruthy();
  }));

  it('should be vehicle type "test"', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.cast.subscribe(vehicle => {
      expect(vehicle).toBeTruthy();
      expect(vehicle.type).toBeTruthy();
      expect(vehicle.type.name).toEqual('test');
    });
  }));

  it('should be vehicle type set sdp to default', inject([MaxmetalService], (service: MaxmetalService) => {
      service.setVehicleType(vehicleType);
      service.cast.subscribe(vehicle => {
        expect(vehicle.sdp).toBeTruthy();
        expect(vehicle.sdp.min).toEqual(vehicleType.sdp.min);
        expect(vehicle.sdp.max).toEqual(vehicleType.sdp.max);
        expect(vehicle.sdp.curr).toEqual(vehicleType.sdp.min);
        expect(vehicle.sdp.base).toEqual(vehicleType.sdp.min);
        expect(vehicle.sdp.adjusted.min).toEqual(-5);
        expect(vehicle.sdp.adjusted.max).toEqual(3);
        expect(vehicle.sdp.adjusted.curr).toEqual(0);
      });
  }));

  it('should be vehicle type decelerate calculated', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.cast.subscribe(vehicle => {
      expect(vehicle.speed.decelerate).toBeTruthy();
      expect(vehicle.speed.decelerate.min).toEqual(2);
      expect(vehicle.speed.decelerate.max).toEqual(4);
    });
  }));

  it('should be vehicle type accelerate calculated', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.cast.subscribe(vehicle => {
      expect(vehicle.speed.accelerate).toBeTruthy();
      expect(vehicle.speed.accelerate.min).toEqual(5);
      expect(vehicle.speed.accelerate.max).toEqual(10);
    });
  }));

  it('should be vehicle type range calculated', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.cast.subscribe(vehicle => {
      expect(vehicle.range).toBeTruthy();
      expect(vehicle.range.min).toEqual(1);
      expect(vehicle.range.max).toEqual(430);
    });
  }));

  it('should be vehicle type SP calculated', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.cast.subscribe(vehicle => {
      expect(vehicle.sp).toBeTruthy();
      expect(vehicle.sp.min).toEqual(0);
      expect(vehicle.sp.curr).toEqual(0);
      expect(vehicle.sp.max).toEqual(5);
      expect(vehicle.sp.spdMod).toEqual(0);
    });
  }));

  it('should be vehicle type Speed calculated', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.cast.subscribe(vehicle => {
      expect(vehicle.speed).toBeTruthy();
      expect(vehicle.speed.min).toEqual(5);
      expect(vehicle.speed.curr).toEqual(50);
      expect(vehicle.speed.max).toEqual(100);
      expect(vehicle.speed.base).toEqual(50);
      expect(vehicle.speed.cost).toEqual(1);
    });
  }));

  it('should be vehicle type Mass calculated', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.cast.subscribe(vehicle => {
      expect(vehicle.mass).toBeTruthy();
      expect(vehicle.mass.curr).toEqual(5);
      expect(vehicle.mass.base).toEqual(5);
      expect(vehicle.mass.value).toEqual(`5 ${vehicleType.mass.unit}`);
    });
  }));

  it('should be vehicle type Cost calculated', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.cast.subscribe(vehicle => {
      expect(vehicle.cost).toBeTruthy();
      expect(vehicle.cost).toEqual(1000);
    });
  }));

  it('should be increase sdp and recalculate', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.changeSDP(5);
    service.cast.subscribe(vehicle => {
      expect(vehicle.sdp.base).toEqual(15);
      expect(vehicle.sdp.curr).toEqual(15);
      expect(vehicle.sdp.min).toEqual(vehicleType.sdp.min);
      expect(vehicle.sdp.max).toEqual(vehicleType.sdp.max);
      // calculatedAdjSDP
      expect(vehicle.sdp.adjusted.min).toEqual(-7);
      expect(vehicle.sdp.adjusted.max).toEqual(4);
      expect(vehicle.sdp.adjusted.curr).toEqual(0);
      // calculatedSP
      expect(vehicle.sp.max).toEqual(8);
      // calculatedMass
      expect(vehicle.mass.curr).toEqual(7.5);
      expect(vehicle.mass.base).toEqual(7.5);
      expect(vehicle.mass.value).toEqual(`7.5 ${vehicleType.mass.unit}`);
      // calculatedCost
      expect(vehicle.cost).toEqual(1500);
      // CalculatedSpace
      expect(vehicle.maxSpaces).toEqual(15);
    });
  }));

  it('should be decrease sdp and recalculate', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.changeSDP(5);
    service.changeSDP(-2);
    service.cast.subscribe(vehicle => {
      expect(vehicle.sdp.base).toEqual(13);
      expect(vehicle.sdp.curr).toEqual(13);
      expect(vehicle.sdp.min).toEqual(vehicleType.sdp.min);
      expect(vehicle.sdp.max).toEqual(vehicleType.sdp.max);
      // calculatedAdjSDP
      expect(vehicle.sdp.adjusted.min).toEqual(-6);
      expect(vehicle.sdp.adjusted.max).toEqual(4);
      expect(vehicle.sdp.adjusted.curr).toEqual(0);
      // calculatedSP
      expect(vehicle.sp.max).toEqual(7);
      // calculatedMass
      expect(vehicle.mass.curr).toEqual(6.5);
      expect(vehicle.mass.base).toEqual(6.5);
      expect(vehicle.mass.value).toEqual(`6.5 ${vehicleType.mass.unit}`);
      // calculatedCost
      expect(vehicle.cost).toEqual(1300);
      // CalculatedSpace
      expect(vehicle.maxSpaces).toEqual(13);
    });
  }));

  it('should not go over max sdp', inject([MaxmetalService], (service: MaxmetalService) => {
    service.setVehicleType(vehicleType);
    service.changeSDP(250);
    service.cast.subscribe(vehicle => {
      expect(vehicle.sdp.base).toEqual(vehicleType.sdp.max);
      expect(vehicle.sdp.curr).toEqual(40);
      // calculatedAdjSDP
      expect(vehicle.sdp.adjusted.min).toEqual(-20);
      expect(vehicle.sdp.adjusted.max).toEqual(10);
      expect(vehicle.sdp.adjusted.curr).toEqual(0);
    });
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
