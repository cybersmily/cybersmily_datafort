import { JsonDataFiles } from './../../json-data-files';

import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
        MaxMetalWeaponCategory,
        MaxMetalWeaponMount,
        VehicleWeapon } from './../../models/weapon';
import { MaxMetalOption, VehicleType } from './../../models/maxmetal';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class MaxMetalDataService {
  private _weapons: any;
  private _options: any;
  private _mounts: any;
  private _vehicleTypes: any;

  constructor(private dataSerivce: DataService ) { }

  loadMaxMetalData(): Observable<boolean> {
    return forkJoin([
      this.dataSerivce.GetJson(JsonDataFiles.CP2020_MAXMETAL_WEAPONS_JSON),
      this.dataSerivce.GetJson(JsonDataFiles.CP2020_MAXMETAL_OPTIONS_JSON),
      this.dataSerivce.GetJson(JsonDataFiles.CP2020_MAXMETAL_MOUNTS_JSON),
      this.dataSerivce.GetJson(JsonDataFiles.CP2020_MAXMETAL_TYPES_JSON)

    ]).pipe( map( results => {
      this._weapons = this.createWeaponCategories(results[0].weapons);
      this._options = this.createOptionCategories(results[1].options);
      this._mounts = results[2].mounts;
      this._vehicleTypes = results[3].baseTypes;
      return true;
    }));
  }

  loadWeapons(): Observable<Array<MaxMetalWeaponCategory>> {
    if ( this._weapons) {
      return of(this._weapons);
    }
    return this.loadMaxMetalData()
    .pipe(
      map( data => {
        return this._weapons;
      }));
  }

  loadOptions(): Observable<Array<MaxMetalOption>> {
    if (this._options) {
      return of(this._options);
    }
    return this.loadMaxMetalData()
    .pipe(
      map(data => {
        return this._options;
      }));
  }

  loadWeaponMounts(): Observable<Array<MaxMetalWeaponMount>> {
    if (this._mounts) {
      return of(this._mounts);
    }
    return this.loadMaxMetalData()
    .pipe(
      map(data => { return this._mounts;
      }));
  }

  loadVehicleTypes(): Observable<Array<VehicleType>> {
    if (this._vehicleTypes) {
      return of(this._vehicleTypes);
    }
    return this.loadMaxMetalData()
    .pipe(
      map(data => {
        return this._vehicleTypes;
      }));
  }

  private createOptionCategories(options: MaxMetalOption[]) {
    const optionCategories = {};
    options.forEach(opt => {
      if (!(optionCategories[opt.type])) {
        optionCategories[opt.type] = { name: opt.type.replace(/_/g, ' ' ), id: opt.type, items: []};
      }
      optionCategories[opt.type].items.push(opt);
      return opt;
    });
    return this.generateArray(optionCategories);
  }


  private createWeaponCategories(weapons: VehicleWeapon[]) {
    const weaponCategories = {};
    weapons.forEach(wpn => {
      if (!(weaponCategories[wpn.type])) {
        weaponCategories[wpn.type] = { name: wpn.type, id: wpn.type, items: []};
      }
      weaponCategories[wpn.type].items.push(wpn);
    });
    return this.generateArray(weaponCategories);
  }


  private generateArray(obj: any) {
    return Object.keys(obj).map(key => {
      return { key: key, value: obj[key] };
    });
  }
}
