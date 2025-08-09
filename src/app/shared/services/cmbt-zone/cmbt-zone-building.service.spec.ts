import { of } from 'rxjs';
import { CmbtZoneData } from './../../models/cmbtzone/cmbt-zone-data';
import { DiceService } from './../dice/dice.service';
import { DataService } from './../file-services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CmbtZoneBuildingService } from './cmbt-zone-building.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CmbtZoneBuildingService', () => {
  let service: CmbtZoneBuildingService;
  let data: DataService;
  let dice: DiceService;
  let testData: CmbtZoneData;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        DiceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(CmbtZoneBuildingService);
    dice = TestBed.inject(DiceService);
    data = TestBed.inject(DataService);
    testData = {
      buildings: {
        types: [],
        condition: [],
        occupates: [],
        use: []
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createBuildings()', () => {
    it('should get list from GetJson', () => {
      spyOn(data, 'GetJson').and.returnValue(of(testData));
      service.createBuildings(3, dice).subscribe( list => {
        expect(list).toBeTruthy();
        expect(list.length).toEqual(3);
      });
    });
    it('should get list from cache', () => {
      service._buildingData = testData;
      service.createBuildings(3, dice).subscribe( list => {
        expect(list).toBeTruthy();
        expect(list.length).toEqual(3);
      });
    });
  });

  describe('generateList()', () => {
    it('should get list from cache', () => {
      service._buildingData = testData;
      const list = service.generateList(3, dice);
        expect(list).toBeTruthy();
        expect(list.length).toEqual(3);
    });
  });
});
