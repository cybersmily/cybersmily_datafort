import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../../services/file-services/data.service';
import { TestBed } from '@angular/core/testing';

import { ArmorDataService } from './armor-data.service';
import { Cp2020ArmorLayer } from './../models';

describe('ArmorDataService', () => {
  let service: ArmorDataService;
  let dataService: DataService;
  let testArmor: Array<Cp2020ArmorLayer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DataService]
  });
  dataService = TestBed.inject(DataService);
  service = new ArmorDataService(dataService);
  testArmor = new Array();
  testArmor.push(new Cp2020ArmorLayer());
  testArmor.push(new Cp2020ArmorLayer());
  testArmor.push(new Cp2020ArmorLayer());
  testArmor.push(new Cp2020ArmorLayer());
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get armor list from file', (done) => {
    spyOn(dataService, 'GetJson').and.returnValue(of(testArmor));
    service.getArmorList().subscribe( list => {
      expect(list).toBeTruthy();
      expect(list.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  it('should get armor list from cache', (done) => {
    service['armorList'] = [...testArmor];
    service.getArmorList().subscribe( list => {
      expect(list).toBeTruthy();
      expect(list.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });
});
