import { HotStuffMaxRollCalculation } from './../../functions/hot-stuff-max-roll-calculation';
import { HotStuffArea } from './../../models/hot-stuff-area';
import { DiceService } from './../../../../services/dice/dice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FixerHotStuffGenerationService {
  constructor() {}

  randomlyGenerate(
    dice: DiceService,
    fields: Array<string>,
    availablePoints: number
  ): Array<HotStuffArea> {
    const results = new Array<HotStuffArea>();
    // check to see if there are available points
    let numOfRolls = HotStuffMaxRollCalculation(availablePoints);
    // loop until there is no more possible rolls
    while (numOfRolls > 0) {
      // generate an area
      const area = new HotStuffArea();
      // check to make sure there are no duplicate areas
      do {
        area.area = fields[dice.generateNumber(0, fields.length - 1)];
        console.log(area);
      } while (results.some((f) => f.area === area.area));
      area.rolls = dice.generateNumber(1, numOfRolls);
      results.push(area);
      results.sort((a, b) => (a.area > b.area ? 1 : -1));
      availablePoints -= area.points;
      numOfRolls = HotStuffMaxRollCalculation(availablePoints);
    }
    return results;
  }
}
