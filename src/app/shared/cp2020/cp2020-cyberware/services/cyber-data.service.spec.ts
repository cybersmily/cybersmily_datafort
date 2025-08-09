import { DataCyberware } from './../models/data-cyberware';
import { of } from 'rxjs';
import { DataService } from './../../../services/file-services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CyberDataService } from './cyber-data.service';

describe('CyberDataService', () => {
  let service: CyberDataService;
  let dataService: DataService;
  let cyberDataList: Array<DataCyberware>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        CyberDataService,
        provideHttpClient(withInterceptorsFromDi())
    ]
}));

  beforeEach(() => {
    cyberDataList = new Array<DataCyberware>();
    cyberDataList.push(new DataCyberware({ name: 'cyber2', type: 'cyberoptic', subtype: 'option' }));
    cyberDataList.push(new DataCyberware({ name: 'cyber5', type: 'neuralware', subtype: 'chipware' }));
    cyberDataList.push(new DataCyberware({ name: 'cyber3', type: 'implant', subtype: 'borg' }));
    cyberDataList.push(new DataCyberware({ name: 'cyber1', type: 'cyberoptic', subtype: '' }));
    cyberDataList.push(new DataCyberware({ name: 'cyber4', type: 'linearframe', subtype: '' }));

    dataService = TestBed.inject(DataService);
    spyOn(dataService, 'GetJson').and.returnValue(of(cyberDataList));
    service = new CyberDataService(dataService, undefined);

  });

  describe('constructor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('CyberList', () => {
    it('should get sorted CyberwareList', (done) => {
      service.CyberwareList.subscribe(data => {
        expect(data.length).toEqual(cyberDataList.length);
        expect(data[0].name).toEqual('cyber1');
        expect(data[0].type).toEqual('cyberoptic');
        expect(data[0].subtype).toEqual('');
        expect(data[data.length - 1].type).toEqual('neuralware');
        expect(data[data.length - 1].name).toEqual('cyber5');
        done();
      });
    });
  });

  describe('cp2020CyberwareList', () => {
    it('should get sorted list', (done) => {
      service.CyberwareList.subscribe(data => {
        expect(data.length).toEqual(cyberDataList.length);
        expect(data[0].name).toEqual('cyber1');
        expect(data[0].type).toEqual('cyberoptic');
        expect(data[0].subtype).toEqual('');
        expect(data[data.length - 1].type).toEqual('neuralware');
        expect(data[data.length - 1].name).toEqual('cyber5');
        done();
      });
    });

    it('should get Cp2020PlayerCyber objectsorted list', (done) => {
      service.cp2020CyberwareList.subscribe(data => {
        expect(data.length).toEqual(cyberDataList.length);
        expect(data[0].hl).toEqual(0);
        done();
      });
    });
  });

  describe('getCyberwareOptions()', () => {
    it('should get options', (done) => {
      service.getCyberwareOptions('cyberoptic')
      .subscribe( data => {
        expect(data.length).toEqual(1);
        expect(data[0].name).toEqual('cyber2');
        done();
      });
    });

    it('should not get options with undefined param', (done) => {
      service.getCyberwareOptions(undefined)
      .subscribe( data => {
        expect(data.length).toEqual(0);
        done();
      });
    });

    it('should not get options with blank param', (done) => {
      service.getCyberwareOptions('')
      .subscribe( data => {
        expect(data.length).toEqual(0);
        done();
      });
    });
  });

  describe('getCP2020CyberwareOptions()', () => {
    it('should get options', (done) => {
      service.getCP2020CyberwareOptions('cyberoptic')
      .subscribe( data => {
        expect(data.length).toEqual(1);
        expect(data[0].name).toEqual('cyber2');
        expect(data[0].hl).toEqual(0);
        done();
      });
    });

    it('should not get options with undefined param', (done) => {
      service.getCP2020CyberwareOptions(undefined)
      .subscribe( data => {
        expect(data.length).toEqual(0);
        done();
      });
    });

    it('should not get options with blank param', (done) => {
      service.getCP2020CyberwareOptions('')
      .subscribe( data => {
        expect(data.length).toEqual(0);
        done();
      });
    });
  });

  describe('add()', () => {
    it('should add to list', (done) => {
      const cyber = new DataCyberware({ name: 'cyber6', type: 'cyberoptic', subtype: 'option2' });
      service.add(cyber);
      service.CyberwareList.subscribe(data => {
        expect(data.length).toEqual(6);
        done();
      });
    });
  });

  describe('delete()', () => {
    it('should delete cyber from list', (done) => {
      service.delete('cyber1', 'cyberoptic', '');
      service.CyberwareList.subscribe(data => {
        expect(data.length).toEqual(4);
        done();
      });
    });
  });

});
