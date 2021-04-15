import { SaveFileService, JsonDataFiles, DataService } from './../../../services/file-services';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataWeapon } from './../models';

@Injectable({
  providedIn: 'root'
})
export class WeaponDataService {

  private _weaponList: Array<DataWeapon>;

  constructor(private dataService: DataService, private saveFileService: SaveFileService) { }

  get WeaponList(): Observable<Array<DataWeapon>> {
    if (this._weaponList && this._weaponList.length > 0 ) {
      return of(this._weaponList);
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_WEAPON_DATA_LIST_JSON)
    .pipe(
      map( (data: Array<DataWeapon>) => {
        data = data.map( (w, i) => {
          w.id = (w.id) ? w.id : i;
          return w;
        });
        this._weaponList = data.sort( (a, b) => {
          if (a.category === b.category) {
            if (a.subcategory === b.subcategory) {
              return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            }
            return a.subcategory.toLowerCase() > b.subcategory.toLowerCase() ? 1 : -1;
          }
          return a.category.toLowerCase() > b.category.toLowerCase() ? 1 : -1;
        }).map(w => new DataWeapon(w));
        return this._weaponList;
      })
    );
  }

  get Sources(): Observable<Array<string>> {
    return this.WeaponList.pipe(
      map( data => {
        let sources = new Array<string>();
        data.map( wpn => sources.push(wpn.source.book));
        sources = [...new Set(sources)];
        return sources;
      })
    );
  }

  save() {
    this.saveFileService.SaveAsFile('cp2020weapons', JSON.stringify(this._weaponList), 'json');
  }

  add(weapon: DataWeapon) {
    if ( !this._weaponList.some(w => w.name === weapon.name && w.category === weapon.category)) {
      const ids = this._weaponList.map(w => w.id);
      const lastId = Math.max.apply(null, ids);
      weapon.id = lastId + 1;
      weapon.bod = (weapon.bod > 0) ? weapon.bod : undefined;
      weapon.ap = (weapon.ap !== '') ? weapon.ap : undefined;
      weapon.burst = (weapon.burst > 0 || weapon.burst !== '') ? weapon.burst : undefined;
      weapon.shots = (weapon.shots > 0 ) ? weapon.shots : 0;
      weapon.rof = (weapon.rof > 0 ) ? weapon.rof : 0;
      weapon.range = (weapon.range > 0 ) ? weapon.range : 0;
      weapon.burstFire = (weapon.burstFire) ? true : undefined;
      weapon.fullAuto = (weapon.fullAuto) ? true : undefined;
      weapon.thrown = (weapon.thrown) ? true : undefined;
      this._weaponList.push(weapon);
    }
  }

  delete(weapon: DataWeapon) {
    const i = this._weaponList
    .findIndex( c => c.name === weapon.name && c.category === weapon.category);
    this._weaponList.splice(i, 1 );
  }

  edit(weapon: DataWeapon) {
    const i = this._weaponList.findIndex( c => {
      return (c.id === weapon.id);
    });
    if (i > -1) {
      weapon.bod = (weapon.bod > 0) ? weapon.bod : undefined;
      weapon.burst = (weapon.burst > 0 || weapon.burst !== '') ? weapon.burst : undefined;
      weapon.shots = (weapon.shots > 0 ) ? weapon.shots : 0;
      weapon.ap = (weapon.ap !== '') ? weapon.ap : undefined;
      weapon.rof = (weapon.rof > 0 ) ? weapon.rof : 0;
      weapon.range = (weapon.range > 0 ) ? weapon.range : 0;
      weapon.burstFire = (weapon.burstFire) ? true : undefined;
      weapon.fullAuto = (weapon.fullAuto) ? true : undefined;
      weapon.thrown = (weapon.thrown) ? true : undefined;
      this._weaponList[i] = weapon;
    }
  }
}
