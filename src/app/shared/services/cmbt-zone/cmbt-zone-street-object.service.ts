import { DiceService } from '../dice/dice.service';
import { JsonDataFiles } from './../file-services';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService } from './../file-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmbtZoneStreetObjectService {

  _trashData: Array<string>;

  constructor(private dataService: DataService) { }

  createTrash(num: number, dice: DiceService): Observable<Array<string>> {
    if (this._trashData && this._trashData.length > 0) {
      return of(this.generateTrashList(num, dice));
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_COMBAT_ZONE_OBJECTS_JSON).pipe(
      map( data => {
        this._trashData = data;
        return this.generateTrashList(num, dice);
      }));
  }

  generateTrashList(num: number, dice: DiceService): Array<string> {
    const results = new Array<string>();
    for (let i = 0; i < num; i++) {
      const object = dice.getRandomValue(this._trashData);
      results.push(object);
    }
    return results;
  }

}
