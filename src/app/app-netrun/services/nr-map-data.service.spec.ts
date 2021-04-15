import { NRRegionMap } from './../models/nr-region-map';
import { of } from 'rxjs';
import { NRMap } from './../models/nr-map';
import { NrLoadMapsService } from './nr-load-maps.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services/data.service';
import { TestBed } from '@angular/core/testing';

import { NrMapDataService } from './nr-map-data.service';

describe('NrMapDataService', () => {
  let service: NrMapDataService;
  let loadService: NrLoadMapsService;
  let testNRData: any;
  let testAfrikaniMap: NRMap;
  let testWorldMap: NRMap;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    loadService = TestBed.inject(NrLoadMapsService);
    testNRData = {
      regions: [
        { name: 'World', map: 'reg/wld.json' },
        { name: 'Afrikani', map: 'reg/afr.json' }
      ],
      cities: [
        { name: 'Cairo', region: 'Afrikani', security: 4, trace: 4, controlby: 'Orbital Air', world: true },
        { name: 'Delhi', region: 'Afrikani', security: 1, trace: 2, controlby: 'None', world: true },
        { name: 'Mumbai', region: 'Afrikani', security: 3, trace: 2, controlby: 'None' },
        { name: 'Chennai', region: 'Afrikani', security: 3, trace: 2, controlby: 'None' }
      ]
    };

    testAfrikaniMap = {
      name: 'Afrikani',
      type: 'r',
      w: 1005,
      h: 775,
      nx: 26,
      ny: 21,
      gridsize: 40,
      offsetx: 30,
      offsety: 3,
      lx: 13,
      ly: 12,
      img: 'img/apps/regionmaps/Afrikani.png',
      dforts: [
        { img: 'city', top: 30, left: 12, align: 'l', row: 1, column: 3, name: 'Gibraltar', type: '' },
        { img: 'city', top: 3, left: 17, align: 'l', row: 1, column: 10, name: 'Athens', type: '' },
        { img: 'ldl', top: 0, left: 22, align: 'l', row: 1, column: 14, name: 'LDL', type: '' }
      ]
    };

    testWorldMap = {
      name: 'World',
      type: 'w',
      w: 1008,
      h: 618,
      nx: 21,
      ny: 13,
      gridsize: 48,
      offsetx: 48,
      offsety: 48,
      lx: 40,
      ly: 42,
      img: 'img/apps/regionmaps/nrworldmap.png',
      dforts: [
        { img: 'city', top: 30, left: 30, align: 'r', row: 4, column: 10, name: 'Stockholm', type: '' },
        { img: 'city', top: 30, left: 30, align: 'l', row: 5, column: 2, name: 'Seatle', type: '' },
        { img: 'city', top: 30, left: 30, align: 'r', row: 5, column: 5, name: 'Montreal', type: '' }
      ]
    };

    spyOn(loadService, 'nrMapData').and.returnValue(of(testNRData));
    spyOn(loadService, 'getNRMap').and.callFake( (param) => {
      if (param === 'reg/afr.json') {
        return of(testAfrikaniMap);
      }
      return  of(testWorldMap);
    });
    service = new NrMapDataService(loadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.activemap).toEqual('');
    expect(service.cityList).not.toBeUndefined();
    expect(service.currMapIndex).toEqual(-1);
  });

  describe('GetMap', () => {
    beforeEach(() => {
      service = new NrMapDataService(loadService);
    });
    it('should getMap return empty string', () => {
      const result = service.GetMap('');
      expect(result).toBeUndefined();
      expect(service.activemap).toEqual('');
      expect(service.currMapIndex).toEqual(-1);
    });

    it('should getMap check currMap is Afrikani', (done) => {
      const reg = testNRData.regions[1];
      service.GetMap(reg.map);
      service.currMap.subscribe( data => {
        expect(data).toBeTruthy();
        expect(data.name).toEqual(testAfrikaniMap.name);
        expect(data.img).toEqual(testAfrikaniMap.img);
        expect(data.dforts.length).toEqual(testAfrikaniMap.dforts.length);
        done();
      });
    });

    it('should getMap check mapRows has Afrikani', (done) => {
      const reg = testNRData.regions[1];
      service.GetMap(reg.map);
      service.mapRows.subscribe( data => {
        expect(data).toBeTruthy();
        expect(data.length).toEqual(21);
        done();
      });
    });

    it('should getMap check currMap is Afrikani', (done) => {
      const reg = testNRData.regions[1];
      const regWorld = testNRData.regions[0];
      service.GetMap(reg.map);
      expect(service.currMapIndex).toEqual(0);
      service.GetMap(regWorld.map);
      expect(service.currMapIndex).toEqual(1);
      service.GetMap(reg.map);
      expect(service.currMapIndex).toEqual(0);
      service.currMap.subscribe( data => {
        expect(data).toBeTruthy();
        expect(data.name).toEqual(testAfrikaniMap.name);
        expect(data.img).toEqual(testAfrikaniMap.img);
        expect(data.dforts.length).toEqual(testAfrikaniMap.dforts.length);
        done();
      });
    });
  });

  it('should create grid array', () => {
    const grid: Array<any> =  service.createGrid(5, 5);
    expect(grid.length).toEqual(5);
    expect(grid[2].length).toEqual(5);
    expect(grid[2][2].v).toEqual(false);
    expect(grid[2][2].s).toEqual(false);
  });

  it('should findLDL', () => {
    const regionMap = new NRRegionMap();
    regionMap.initializeMap(testAfrikaniMap);
    service['_map'].next(regionMap);
    const results = service.findLDL('LDL');
    expect(results.x).toEqual(1);
    expect(results.y).toEqual(14);
  });

  it('should getCurrRegionName', () => {
    const regionMap = new NRRegionMap();
    regionMap.initializeMap(testAfrikaniMap);
    service['_map'].next(regionMap);
    expect(service.getCurrRegionName()).toEqual(testAfrikaniMap.name);
  });

  it('should getCurrRegionType', () => {
    const regionMap = new NRRegionMap();
    regionMap.initializeMap(testAfrikaniMap);
    service['_map'].next(regionMap);
    expect(service.getCurrRegionType()).toEqual(testAfrikaniMap.type);
  });

  describe('findAndSetMap', () => {
    it('should find and set map', (done) => {
      const reg = testNRData.regions[1];
      service['regionList'].next(testNRData.regions);
      service.findAndSetMap(reg.name, false);
      service.currMap.subscribe( data => {
        expect(data).toBeTruthy();
        expect(data.name).toEqual(testAfrikaniMap.name);
        expect(data.img).toEqual(testAfrikaniMap.img);
        done();
      });
    });

    it('should find and set map with LDL', (done) => {
      const reg = testNRData.regions[1];
      service['regionList'].next(testNRData.regions);
      service.findAndSetMap(reg.name, false, 'ldl');
      service.currMap.subscribe( data => {
        expect(data).toBeTruthy();
        expect(data.name).toEqual(testAfrikaniMap.name);
        expect(data.img).toEqual(testAfrikaniMap.img);
        done();
      });
    });
  });

});
