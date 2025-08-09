import { of } from 'rxjs';
import { DataService, SaveFileService } from '../../../services/file-services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeaponDataService } from './weapon-data.service';
import { DataWeapon } from './../models';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('WeaponDataService', () => {
  let service: WeaponDataService;
  let dataService: DataService;
  let fileService: SaveFileService;
  let testWeaponList: Array<DataWeapon>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        SaveFileService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fileService = TestBed.inject(SaveFileService);
    dataService = TestBed.inject(DataService);
    service = new WeaponDataService(dataService, fileService);
    testWeaponList = new Array<DataWeapon>();
    testWeaponList.push(new DataWeapon(
      { name: 'weapon1', category: 'PISTOL', subcategory: 'HEAVY', type: 'P', source: { book: 'CP2020' } }
    ));
    testWeaponList.push(new DataWeapon(
      { name: 'weapon2', category: 'SUBMACHINEGUN', subcategory: 'MEDIUM', type: 'SMG', source: { book: 'LU' } }
    ));
    testWeaponList.push(new DataWeapon(
      { name: 'weapon3', category: 'RIFLE', subcategory: 'ASSAULT', type: 'RIF', source: { book: 'SOF' } }
    ));
    testWeaponList.push(new DataWeapon(
      { name: 'weapon4', category: 'RIFLE', subcategory: 'SNIPER', type: 'SMG', source: { book: 'CP2020' } }
    ));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get WeaponList', () => {
    it('should get weapon list from data service', (done) => {
      spyOn(dataService, 'GetJson').and.returnValue(of(testWeaponList));
      service.WeaponList.subscribe(weapons => {
        expect(weapons).toBeTruthy();
        expect(weapons.length).toEqual(4);
        expect(weapons[0].name).toEqual(testWeaponList[0].name);
        expect(weapons[3].name).toEqual(testWeaponList[1].name);
        done();
      });
    });

    it('should get weapon list from cache', (done) => {
      service['_weaponList'] = testWeaponList;
      service.WeaponList.subscribe(weapons => {
        expect(weapons).toBeTruthy();
        expect(weapons.length).toEqual(4);
        expect(weapons[0].name).toEqual(testWeaponList[0].name);
        expect(weapons[3].name).toEqual(testWeaponList[3].name);
        done();
      });
    });
  });

  describe('Get Sources', () => {
    it('should get an array of source boks', (done) => {
      service['_weaponList'] = testWeaponList;
      service.Sources.subscribe(sources => {
        expect(sources).toBeTruthy();
        expect(Array.isArray(sources)).toBeTruthy();
        expect(sources.length).toEqual(3);
        expect(sources.includes('CP2020')).toBeTruthy();
        done();
      });
    });
  });

  describe('Add Weapon', () => {
    it('should add weapon', (done) => {
      service['_weaponList'] = testWeaponList;
      const newWeapon = new DataWeapon({
        name: 'weapon5',
        category: 'EXOTIC',
        subcategory: '',
        type: 'EX',
        source: { book: 'DS' }
      });

      service.add(newWeapon);
      service.WeaponList.subscribe(weapons => {
        expect(weapons.length).toEqual(5);
        expect(weapons.includes(newWeapon)).toBeTruthy();
        done();
      });
    });

    it('should not add duplicate weapon', (done) => {
      service['_weaponList'] = testWeaponList;
      const newWeapon = new DataWeapon({
        name: 'weapon3',
        category: 'RIFLE',
        subcategory: 'ASSAULT',
        type: 'RIF',
        source: { book: 'SOF' }
      });

      service.add(newWeapon);
      service.WeaponList.subscribe(weapons => {
        expect(weapons.length).toEqual(4);
        done();
      });
    });
  });

  describe('Delete Weapon', () => {
    it('should delete weapon', (done) => {
      service['_weaponList'] = [...testWeaponList];
      service.delete(testWeaponList[1]);
      service.WeaponList.subscribe(weapons => {
        expect(weapons.length).toEqual(3);
        expect(weapons.includes(testWeaponList[1])).toBeFalsy();
        done();
      });
    });
  });

  describe('Edit Weapon', () => {
    it('should delete weapon', (done) => {
      service['_weaponList'] = [...testWeaponList];
      const editWeapon = new DataWeapon({
          name: 'weapon4',
          category: 'RIFLE',
          subcategory: 'ASSAULT',
          type: 'RIF',
          damage: '5d6',
          source: { book: 'CP2020' }
        });
        service.edit(editWeapon);
      service.WeaponList.subscribe(weapons => {
        expect(weapons.length).toEqual(4);
        const weapon = weapons.find( wpn => wpn.name === editWeapon.name);
        expect(weapon).toBeTruthy();
        expect(weapon.name).toEqual(editWeapon.name);
        expect(weapon.damage).toBeTruthy();
        expect(weapon.damage).toEqual(editWeapon.damage);
        done();
      });
    });

  });


});
