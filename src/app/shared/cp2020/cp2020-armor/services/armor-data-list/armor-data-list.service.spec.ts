import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from '../../../../services/file-services';
import { TestBed } from '@angular/core/testing';

import { ArmorDataListService } from './armor-data-list.service';
import { Cp2020ArmorPiece } from '../../models';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArmorDataService', () => {
  let service: ArmorDataListService;
  let dataService: DataService;
  let testArmor: Array<Cp2020ArmorPiece>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  dataService = TestBed.inject(DataService);
  service = new ArmorDataListService(dataService);
  testArmor = new Array<Cp2020ArmorPiece>();
  testArmor.push(new Cp2020ArmorPiece());
  testArmor.push(new Cp2020ArmorPiece());
  testArmor.push(new Cp2020ArmorPiece());
  testArmor.push(new Cp2020ArmorPiece());
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get armor list from file', (done) => {
    spyOn(dataService, 'GetJson').and.returnValue(of(testArmor));
    service.getData().subscribe( list => {
      expect(list).toBeTruthy();
      expect(list.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  it('should get armor list from cache', (done) => {
    service['_armorList'] = [...testArmor];
    service.getData().subscribe( list => {
      expect(list).toBeTruthy();
      expect(list.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });
});
