import { DiceService } from './../dice/dice.service';
import { map } from 'rxjs/operators';
import { JsonDataFiles } from './../file-services';
import { Observable, of } from 'rxjs';
import { CmbtZoneBlock } from './../../models/cmbtzone/cmbt-zone-block';
import { DataService } from './../file-services';
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
      // const die = i % 12;
      const block = JSON.parse(JSON.stringify(this._blockData[die])) as CmbtZoneBlock;
      // roll number of stories. the value from the file is the max
      for(let j = 0; j < block.buildings.length; j++) {
        const max = block.buildings[j].stories;
        let stories = dice.generateNumber(3,(max/2)) * 2;
        block.buildings[j].stories = stories;

        block.numOfBuildings = block.buildings.length;
      }
      results.push(block);
    }
    return results;
  }
}
