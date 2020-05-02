import { HotStuffArea } from './../../models/fixer/hot-stuff-area';
import { TestBed, inject, async } from '@angular/core/testing';

import { FixerHotStuffService } from './fixer-hot-stuff.service';

describe('FixerHotStuffService', () => {
  let areas: Array<HotStuffArea>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    areas = new Array<HotStuffArea>();
    for (let i = 0; i < 6; i++){
      const area = new HotStuffArea();
      area.area = 'test_' + i;
      area.details = 'details for test_' + i;
      area.rolls = i + 1;
      areas.push(area);
    }
  });

  it('should be created', () => {
    const service: FixerHotStuffService = TestBed.get(FixerHotStuffService);
    expect(service).toBeTruthy();
  });

  it('should have Streeteal of 5', async(inject([FixerHotStuffService], (service: FixerHotStuffService) => {
    service.reset();
    service.setStreetdeal(5);
    service.model.subscribe( data => {
      expect(data).toBeTruthy(data);
      expect(data.areas.length === 0).toBeTruthy('Hot Stuff areas should be empty.');
      expect(data.streetdeal === 5).toBeTruthy('Hot stuff streetdeal should be 5');
      expect(service.totalPoints === 25).toBeTruthy('Hot Stuff with Streedeal of 5 is not 25 resource points.');
      expect(service.spentPoints === 0).toBeTruthy('Hot Stuff spent points is not 0.');
    });
  })));

  it('should add areas', async(inject([FixerHotStuffService], (service: FixerHotStuffService) => {
    service.reset();
    service.setStreetdeal(5);
    service.addArea(areas[0]);
    service.addArea(areas[1]);

    service.model.subscribe( data => {
      expect(data.areas.length === 2).toBeTruthy('Hot Stuff areas were not added');
      expect(service.spentPoints === 12).toBeTruthy('Hot Stuff 2 areas should be 12 pts but is not.');
    });
  })));

  it('should not add areas', async(inject([FixerHotStuffService], (service: FixerHotStuffService) => {
    service.reset();
    service.setStreetdeal(5);
    service.addArea(areas[5]);

    service.model.subscribe( data => {
      expect(data.areas.length === 0).toBeTruthy('Hot Stuff area was added');
      expect(service.spentPoints === 0).toBeTruthy('Hot Stuff areas should be empty.');
    });
  })));

  it('should delete areas', async(inject([FixerHotStuffService], (service: FixerHotStuffService) => {
    service.reset();
    service.setStreetdeal(5);
    service.addArea(areas[0]);
    service.addArea(areas[1]);
    service.deleteArea(0);
    service.model.subscribe( data => {
      expect(data.areas.length === 1).toBeTruthy('Hot Stuff area was not deleted');
      expect(service.spentPoints === 8).toBeTruthy('Hot Stuff spentpoints be 8 but isn\'t.');
      expect(data.areas[0].area === areas[1].area).toBeTruthy('remaining area is not the second one added.');
    });
  })));

  it('should clear areas', async(inject([FixerHotStuffService], (service: FixerHotStuffService) => {
    service.reset();
    service.setStreetdeal(5);
    service.addArea(areas[0]);
    service.addArea(areas[0]);
    service.addArea(areas[0]);
    service.addArea(areas[0]);
    service.reset();
    service.model.subscribe( data => {
      expect(data.areas.length === 0).toBeTruthy('Hot Stuff area was not deleted');
    });
  })));

});
