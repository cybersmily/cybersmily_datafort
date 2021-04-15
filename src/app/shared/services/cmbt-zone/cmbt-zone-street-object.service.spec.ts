import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../file-services';
import { DiceService } from '../dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { CmbtZoneStreetObjectService } from './cmbt-zone-street-object.service';

describe('CmbtZoneStreetObjectService', () => {
  let service: CmbtZoneStreetObjectService;
  let dice: DiceService;
  let data: DataService;
  let testData: Array<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DiceService,
        DataService
      ]
    });
    service = TestBed.inject(CmbtZoneStreetObjectService);
    dice = TestBed.inject(DiceService);
    data = TestBed.inject(DataService);
    testData = [
      'Dataterm',
      'Abandoned car',
      'Parked car, lockdown',
      'Dumpster',
      'Vending machine',
      'Subway entrance',
      'Pile of trash'
    ];

    spyOn(data, 'GetJson').and.returnValue(of(testData));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createTrash()', () => {
    it('should create a list of items', () => {
      service.createTrash(3, dice).subscribe(list => {
        expect(list).toBeTruthy();
        expect(list.length).toEqual(3);
        expect(service._trashData).toBeTruthy();
      });
    });
  });
  describe('generateTrashList()', () => {
    it('should create a list of items', () => {
      service._trashData = testData;
      const list = service.generateTrashList(3, dice);
      expect(list).toBeTruthy();
      expect(list.length).toEqual(3);
    });
  });
});
