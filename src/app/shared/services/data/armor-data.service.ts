import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';
import { Cp2020ArmorLayer } from '../../models/cp2020character/cp2020-armor-block';

@Injectable({
  providedIn: 'root'
})
export class ArmorDataService {

  private armorList: Array<Cp2020ArmorLayer>;

  constructor(private dataService: DataService) { }

  getArmorList(): Observable<Array<Cp2020ArmorLayer>> {
    if (this.armorList) {
      return of(this.armorList);
    }
    this.dataService.GetJson('/json/apps/cparmor.json').pipe(
      map( data => {
        this.armorList = data;
        return this.armorList;
      })
    );
  }
}
