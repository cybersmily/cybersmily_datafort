import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VehicleWeapon } from './../../models/weapon';
import { MaxMetalOption } from './../../models/maxmetal';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class MaxMetalDataService {

  private weapons: any;
  private options: any;
  private mounts: any;
  private vehicleTypes: any;

  constructor(private dataSerivce: DataService ) { }

  LoadWeapons(): Observable<any> {
    if ( this.weapons) {
      return of(this.weapons);
    }
    return this.dataSerivce
    .GetJson('/json/apps/maxmetal/mmweapons.json')
    .pipe(
      map( data => data.weapons),
      map( data => this.weapons = this.createWeaponCategories(data))
    );
  }

  LoadOptions(): Observable<any> {
    if (this.options) {
      return of(this.options);
    }
    return this.dataSerivce
    .GetJson('/json/apps/maxmetal/mmoptions.json')
    .pipe(
      map( data => data.options),
      map(data => this.options = this.createOptionCategories(data))
     );
  }

  LoadWeaponMounts(): Observable<any> {
    if (this.mounts) {
      return of(this.mounts);
    }
    return this.dataSerivce
    .GetJson('/json/apps/maxmetal/mmweaponmounts.json')
    .pipe(
      map( data => data.mounts),
      map(data => this.mounts = data)
     );
  }

  LoadVehicleTypes(): Observable<any[]> {
    if (this.vehicleTypes) {
      return of(this.vehicleTypes);
    }
    return this.dataSerivce
    .GetJson('/json/apps/maxmetal/mmTypes.json')
    .pipe(
      map( data => data.baseTypes),
      map(data => this.vehicleTypes = data)
     );

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
      return wpn;
    });
    return this.generateArray(weaponCategories);
  }


  private generateArray(obj: any) {
    return Object.keys(obj).map(key => {
      return { key: key, value: obj[key] };
    });
  }
}
