import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './../data.service';
import { DiceService } from './../dice/dice.service';
import { TestBed, async } from '@angular/core/testing';

import { NameGeneratorService } from './name-generator.service';
import { HttpClient } from '@angular/common/http';

describe('NameGeneratorService', async () => {

  let service: NameGeneratorService;
  let http: { get: jasmine.Spy };
  let dataService: DataService;
  let testNameData: Array<string>;
  let testColorsData: Array<string>;
  let regExResult: RegExp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService, DataService, HttpClient],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NameGeneratorService);

    http = jasmine.createSpyObj('HttpClient', ['get']);
    dataService = new DataService(http as any);
    testNameData = ['test', 'test', 'test', 'test', 'test',
      'test', 'test', 'test', 'test', 'test'];
    testColorsData = ['testColor', 'testColor', 'testColor', 'testColor',
      'testColor', 'testColor', 'testColor', 'testColor', 'testColor', 'testColor'];
    // very odd that you need to wrap the array in an array for the proper return value.
    service = new NameGeneratorService(dataService, new DiceService());
    regExResult = RegExp('.*te[sz]t.*');
  });

  afterEach(() => {
  });


  describe('Test loading from file', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should generate name from loading the file', (done: DoneFn) => {
      spyOn(dataService, 'GetJson').and.returnValue([testNameData]);
      service.generateName().subscribe(data => {
        expect(data).toBeTruthy();
        expect(data).not.toContain('undefine');
        expect(data).not.toContain('undefyne');
        expect(regExResult.test(data)).toEqual(true, data);
        done();
      });
    });
  });

  describe('Loading from cache', () => {

    it('should generate name from loading cache', (done: DoneFn) => {
      service['colors'] = testColorsData;
      service['names'] = testNameData;
      service.generateName().subscribe(data => {
        expect(data).toBeTruthy();
        expect(data).not.toContain('undefine');
        expect(data).not.toContain('undefyne');
        expect(regExResult.test(data)).toEqual(true, data);
        done();
      });
    });
  });


  describe('Loading from cache and setting die roll', () => {

    it('should generate name from loading cache with roll set to 5', (done: DoneFn) => {
      const dice = new DiceService();
      spyOn(dice, 'generateNumber').and.returnValue(5);
      service = new NameGeneratorService(dataService, dice);
      service['colors'] = testColorsData;
      service['names'] = testNameData;
      service.generateName().subscribe(data => {
        expect(data).toBeTruthy();
        expect(data).toEqual('test-testColor');
        done();
      });
    });

    it('should generate name from loading cache with roll set to 7', (done: DoneFn) => {
      const dice = new DiceService();
      spyOn(dice, 'generateNumber').and.returnValue(7);
      service = new NameGeneratorService(dataService, dice);
      service['colors'] = testColorsData;
      service['names'] = testNameData;
      service.generateName().subscribe(data => {
        expect(data).toBeTruthy();
        expect(data).toEqual('test-H');
        done();
      });
    });

    it('should generate name from loading cache with roll set to 7', (done: DoneFn) => {
      const dice = new DiceService();
      spyOn(dice, 'generateNumber').and.returnValue(9);
      service = new NameGeneratorService(dataService, dice);
      service['colors'] = testColorsData;
      service['names'] = testNameData;
      service.generateName().subscribe(data => {
        expect(data).toBeTruthy();
        expect(data).toEqual('tezt');
        done();
      });
    });
  });

});
