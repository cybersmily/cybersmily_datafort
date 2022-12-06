import { Cp2020RandomWeaponSettingsService } from './../cp2020-random-weapon-settings/cp2020-random-weapon-settings.service';
import { DataWeapon } from './../../models/data-weapon';
import { map, mergeMap } from 'rxjs/operators';
import { WeaponDataService } from './../weapon-data.service';
import { RandomWeaponFilters } from './../../models/random-weapon-filters';
import { Observable } from 'rxjs';
import { CpPlayerWeapon } from './../../models/cp-player-weapon';
import { DiceService } from './../../../../services/dice/dice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomWeaponGeneratorService {
  constructor(
    private wpnDataService: WeaponDataService,
    private dice: DiceService,
    private weaponSettings: Cp2020RandomWeaponSettingsService
  ) {}

  generate(): Observable<CpPlayerWeapon> {
    return this.weaponSettings.settings.pipe(
      mergeMap((filters) =>
        this.wpnDataService.WeaponList.pipe(
          map((weaponList) => {
            console.log('weaponlist', weaponList);
            console.log('filters: ', filters);
            const list = this.filterList(filters, new Array(...weaponList));
            const roll = this.dice.generateNumber(0, list.length - 1);
            const wpn = new CpPlayerWeapon(list[roll]);
            console.log('list', list);
            return wpn;
          })
        )
      )
    );
  }

  generateList(
    filters: RandomWeaponFilters,
    count: number
  ): Observable<Array<CpPlayerWeapon>> {
    return this.wpnDataService.WeaponList.pipe(
      map((weaponList) => {
        console.log('weaponlist', weaponList);
        console.log('filters: ', filters);
        const list = this.filterList(filters, new Array(...weaponList));
        console.log('list', list);
        const result = new Array<CpPlayerWeapon>();
        for (let i = 0; i < count; i++) {
          const roll = this.dice.generateNumber(0, list.length - 1);
          result.push(new CpPlayerWeapon(list[roll]));
        }
        return result;
      })
    );
  }

  private filterList(
    filters: RandomWeaponFilters,
    list: Array<DataWeapon>
  ): Array<DataWeapon> {
    if (filters.category) {
      console.log('filter on category');
      list = list.filter((wpn) => filters.category.includes(wpn?.category));
    }
    if (filters.subcategory) {
      list = list.filter(
        (wpn) =>
          wpn?.subcategory && filters.subcategory.includes(wpn?.subcategory)
      );
    }
    if (filters.ammo) {
      list = list.filter((wpn) => filters.ammo.includes(wpn.ammo));
    }
    if (filters.cost) {
      list = list.filter((wpn) => wpn?.cost <= filters.cost);
    }
    if (filters.avail) {
      list = list.filter((wpn) => filters.avail.includes(wpn.avail));
    }
    if (filters.conc) {
      list = list.filter((wpn) => filters.conc.includes(wpn.conc));
    }
    if (filters.type) {
      console.log('filter on type');
      list = list.filter((wpn) => filters.type.includes(wpn.type));
    }
    return list;
  }
}
