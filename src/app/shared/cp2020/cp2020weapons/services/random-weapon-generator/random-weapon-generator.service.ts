import { map } from 'rxjs/operators';
import { WeaponDataService } from './../weapon-data.service';
import { RandomWeaponFilters } from './../../models/random-weapon-filters';
import { Observable } from 'rxjs';
import { CpPlayerWeapon } from './../../models/cp-player-weapon';
import { DiceService } from './../../../../services/dice/dice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomWeaponGeneratorService {

  constructor(private wpnDataService: WeaponDataService, private dice: DiceService) { }

  generate(filters: RandomWeaponFilters): Observable<CpPlayerWeapon> {
    return this.wpnDataService.WeaponList.pipe(map(weaponList => {
      let list = new Array(...weaponList);
      if (filters.category) {
        list = list.filter(wpn => filters.category.includes(wpn?.category));
      }
      if (filters.subcategory) {
        list = list.filter(wpn => filters.subcategory.includes(wpn?.subcategory));
      }
      if (filters.ammo) {
        list = list.filter(wpn => filters.ammo.includes(wpn.ammo));
      }
      if (filters.cost) {
        list = list.filter(wpn => wpn?.cost <= filters.cost);
      }
      if (filters.avail) {
        list = list.filter(wpn => filters.avail.includes(wpn.avail));
      }
      if (filters.conc) {
        list = list.filter(wpn => filters.conc.includes(wpn.conc));
      }
      if (filters.type) {
        list = list.filter(wpn => filters.type.includes(wpn.type));
      }
      const roll = this.dice.generateNumber(0, list.length - 1);
      const wpn = new CpPlayerWeapon(list[roll]);
      return wpn;
    }));
  }
}
