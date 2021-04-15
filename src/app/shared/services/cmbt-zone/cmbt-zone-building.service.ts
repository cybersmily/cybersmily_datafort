import { map } from 'rxjs/operators';
import { JsonDataFiles } from './../file-services';
import { Observable, of, forkJoin } from 'rxjs';
import { DiceService } from './../dice/dice.service';
import { CmbtZoneData } from './../../models/cmbtzone/cmbt-zone-data';
import { DataService } from './../file-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmbtZoneBuildingService {
  _buildingData: CmbtZoneData;
  _gangs: Array<string>;

  constructor(private dataService: DataService) { }

  createBuildings(num: number, dice: DiceService): Observable<Array<string>> {
    if (this._buildingData && this._buildingData.buildings) {
      return of(this.generateList(num, dice));
    }
    const data = this.dataService.GetJson(JsonDataFiles.CP2020_COMBAT_ZONE_DATA_JSON);
    const gangs = this.dataService.GetJson(JsonDataFiles.CP2020_COMBAT_ZONE_GANGS_JSON);

    return forkJoin([data, gangs])
      .pipe(
        map(results => {
          this._buildingData = results[0];
          this._gangs = results[1];
          return this.generateList(num, dice);
        })
      );
  }

  generateList(num: number, dice: DiceService): Array<string> {
    const results = new Array<string>();
    for (let i = 0; i < num; i++) {
      let building = dice.getRandomValue(this._buildingData.buildings.condition);
      building += ` ${dice.getRandomValue(this._buildingData.buildings.types)}`;
      let occupates = dice.getRandomValue(this._buildingData.buildings.occupates);
      if (occupates !== 'empty' && !building.startsWith('Burned')) {
        if (occupates === 'gang') {
          const die = dice.rollCP2020D10().total + 1;
          const gang = dice.getRandomValue(this._gangs);
          occupates = `${die} ${gang} gang members`;
        }
        building += ` occupied by ${occupates}.`;
        building += ` It is being used as a ${dice.getRandomValue(this._buildingData.buildings.use)}`;
      } else {
        building += `, empty.`;
      }
      results.push(building);
    }
    return results;
  }
}
