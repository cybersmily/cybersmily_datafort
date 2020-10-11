import { DiceService } from './../dice/dice.service';
import { map } from 'rxjs/operators';
import { JsonDataFiles } from './../../json-data-files';
import { Observable, of } from 'rxjs';
import { CmbtZoneBlock } from './../../models/cmbtzone/cmbt-zone-block';
import { DataService } from '../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmbtZoneBlockService {
  _blockData: Array<CmbtZoneBlock>;

  constructor(private dataService: DataService) { }

  createBlock(dice: DiceService, numBlocks: number): Observable<Array<CmbtZoneBlock>> {
    if (this._blockData) {
      return of(this.generateBuilding(dice, numBlocks));
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_COMBAT_ZONE_BLOCKS_JSON)
    .pipe( map( data => {
      this._blockData = data;
      return this.generateBuilding(dice, numBlocks);
    }));
  }

  generateBuilding(dice: DiceService, numBlocks: number): Array<CmbtZoneBlock> {
    const results = new Array<CmbtZoneBlock>();
    for (let i = 0; i < numBlocks; i++ ) {
      const die = dice.generateNumber(0, this._blockData.length - 1);
      results.push(this._blockData[die]);
    }
    return results;
  }
}
