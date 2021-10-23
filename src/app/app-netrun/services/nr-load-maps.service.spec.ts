import { NRMap } from './../models/nr-map';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { TestBed } from '@angular/core/testing';

import { NrLoadMapsService } from './nr-load-maps.service';

describe('NrLoadMapsService', () => {
  let service: NrLoadMapsService;
  let dataService: DataService;

  let testNRData: any;
  let testMap: NRMap;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NrLoadMapsService,
        DataService,
        HttpClient
      ]
    });
    dataService = TestBed.inject(DataService);
    service = TestBed.inject(NrLoadMapsService);
    testNRData = {
      regions: [
        { name: 'World', map: 'reg/wld.json' },
        { name: 'Afrikani', map: 'reg/afr.json' },
        { name: 'Atlantis', map: 'reg/atl.json' },
        { name: 'EuroTheatre', map: 'reg/eur.json' }
      ],
      cities: [
        { name: 'Cairo', region: 'Afrikani', security: 4, trace: 4, controlby: 'Orbital Air', world: true },
        { name: 'Delhi', region: 'Afrikani', security: 1, trace: 2, controlby: 'None', world: true },
        { name: 'Mumbai', region: 'Afrikani', security: 3, trace: 2, controlby: 'None' },
        { name: 'Chennai', region: 'Afrikani', security: 3, trace: 2, controlby: 'None' }
      ]
    };

    testMap = {
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
        { img: 'city', top: 0, left: 22, align: 'l', row: 1, column: 14, name: 'Ankara', type: '' }
      ]
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load nrMapdata', (done) => {
    spyOn(dataService, 'GetJson').and.returnValue(of(testNRData));
    service.nrMapData.subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.regions).toBeTruthy();
      expect(data.regions.length).toEqual(4);
      expect(data.cities).toBeTruthy();
      expect(data.cities.length).toEqual(4);
      done();
    });

  });

  it('should load NRMap', (done) => {
    spyOn(dataService, 'GetJson').and.returnValue(of(testMap));
    service.getNRMap('test').subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.name).toBeTruthy();
      expect(data.name).toEqual(testMap.name);
      expect(data.dforts).toBeTruthy();
      expect(data.dforts.length).toEqual(testMap.dforts.length);
      done();
    });
  });
});
