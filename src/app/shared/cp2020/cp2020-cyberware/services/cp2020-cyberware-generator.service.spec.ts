import { Cp2020RandomCyberEntry } from './../models/cp2020-random-cyber-entry';
import { of } from 'rxjs';
import { Cp2020PlayerCyber } from './../models/cp2020-player-cyber';
import { CyberDataService } from './cyber-data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services';
import { DiceService } from './../../../services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { Cp2020CyberwareGeneratorService } from './cp2020-cyberware-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020CyberwareGeneratorService', () => {
  let service: Cp2020CyberwareGeneratorService;
  let dice: DiceService;
  let data: DataService;
  let randomCyberwareList: Array<Cp2020RandomCyberEntry>;
  let cyberDataList: Array<Cp2020PlayerCyber>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DiceService,
        DataService,
        CyberDataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    dice = TestBed.inject(DiceService);
    data = TestBed.inject(DataService);
    randomCyberwareList = new Array<Cp2020RandomCyberEntry>();
    randomCyberwareList.push({name: 'cyber1', options: false, hc: 1});
    randomCyberwareList.push({name: 'cyber2', options: false, hc: '1d6'});
    randomCyberwareList.push({name: 'cyber3', options: false, hc: 3});
    randomCyberwareList.push({name: 'cyber4', options: false, hc: '2d6'});
    randomCyberwareList.push({name: 'option', options: true, hc: 1});
    spyOn(data, 'GetJson').and.returnValue(of(randomCyberwareList));
    spyOn(dice, 'generateNumber').and.returnValue(1);
    service = new Cp2020CyberwareGeneratorService(dice, data);

    cyberDataList = new Array<Cp2020PlayerCyber>();
    cyberDataList.push(new Cp2020PlayerCyber({name: 'cyber2', hc: 1, subtype: ''}));
    cyberDataList.push(new Cp2020PlayerCyber({name: 'cyber4', hc: 1, subtype: ''}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate an array of cyberware', (done: DoneFn) => {
    service.generateCyberList(1, cyberDataList)
    .subscribe( list => {
      expect(list.length).toEqual(1);
      done();
    });
  });

  it('should not generate an array of cyberware', (done: DoneFn) => {
    dice.generateNumber = jasmine.createSpy().and.returnValue(2);
    service = new Cp2020CyberwareGeneratorService(dice, data);
    service.generateCyberList(1, cyberDataList)
    .subscribe( list => {
      expect(list.length).toEqual(0);
      done();
    });
  });


  it('should generate an option of cyberware', (done: DoneFn) => {
    dice.generateNumber = jasmine.createSpy().and.returnValue(4);
    service = new Cp2020CyberwareGeneratorService(dice, data);
    service.generateCyberList(1, cyberDataList)
    .subscribe( list => {
      expect(list.length).toEqual(0);
      done();
    });
  });
});
