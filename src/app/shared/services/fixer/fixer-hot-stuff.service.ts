import { DiceService } from './../dice/dice.service';
import { HotStuffModel } from './../../models/fixer/hot-stuff-model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HotStuffArea } from './../../models/fixer/hot-stuff-area';
import { Injectable } from '@angular/core';
import { ChartItem } from '../../cp2020/cp2020-fixerCalc/fixerchart';

@Injectable({
  providedIn: 'root',
})
export class FixerHotStuffService {
  private key = 'csdHotStuffAreas';
  private _model = new BehaviorSubject<HotStuffModel>(new HotStuffModel());
  model = this._model.asObservable();
  private curModel = new HotStuffModel();

  constructor() {
    this.curModel = this.cache;
    this._model.next(this.curModel);
  }

  setStreetdeal(streetdeal: number) {
    this.curModel.streetdeal = streetdeal;
    this.updateModel();
  }

  get totalPoints(): number {
    return this.curModel.streetdeal * this.curModel.streetdeal;
  }

  get spentPoints(): number {
    return this.curModel.areas.reduce((a, b) => a + b.points, 0);
  }

  addArea(area: HotStuffArea) {
    if (area.points + this.spentPoints <= this.totalPoints) {
      const newArea = new HotStuffArea();
      newArea.area = area.area;
      newArea.rolls = area.rolls;
      newArea.details = area.details;
      this.curModel.areas.push(newArea);
      this.curModel.areas.sort((a, b) => (a.area > b.area ? 1 : -1));
      this.updateModel();
    }
  }

  deleteArea(index: number) {
    this.curModel.areas.splice(index, 1);
    this.updateModel();
  }

  updateArea(area: HotStuffArea) {
    const index = this.curModel.areas.findIndex((a) => a.area === area.area);
    this.curModel.areas[index] = area;
    this.updateModel();
  }

  randomlyGenerate(dice: DiceService, fields: Array<string>) {
    // check to see if there are available points
    let numOfRolls = this.getMaxRoll(this.totalPoints - this.spentPoints);
    // loop until there is no more possible rolls
    while (numOfRolls > 0) {
      // generate an area
      const area = new HotStuffArea();
      // check to make sure there are no duplicate areas
      do {
        area.area = fields[dice.generateNumber(0, fields.length - 1)];
      } while (this.curModel.areas.some((f) => f.area === area.area));
      area.rolls = dice.generateNumber(1, numOfRolls);
      this.curModel.areas.push(area);
      this.curModel.areas.sort((a, b) => (a.area > b.area ? 1 : -1));
      this.updateModel();
      numOfRolls = this.getMaxRoll(this.totalPoints - this.spentPoints);
    }
  }

  private getMaxRoll(remaingPoints: number): number {
    // return the number of rolls based on available points
    if (remaingPoints < 4) {
      return 0;
    } else if (remaingPoints > 3 && remaingPoints < 8) {
      return 1;
    } else if (remaingPoints > 7 && remaingPoints < 16) {
      return 2;
    } else if (remaingPoints > 15 && remaingPoints < 32) {
      return 3;
    } else if (remaingPoints > 31 && remaingPoints < 64) {
      return 4;
    }
    return 5;
  }

  reset(streetdeal?: number) {
    this.curModel = new HotStuffModel();
    if (streetdeal) {
      this.curModel.streetdeal = streetdeal;
    }
    this.updateModel();
  }

  toString(): string {
    let output = 'Hot Stuff Contacts\n';
    output += `Streetdeal: ${this.curModel.streetdeal}\n`;
    output += `Network Points:\n`;
    output += `  spent - ${this.spentPoints}\n`;
    output += `  total - ${this.totalPoints}(${this.curModel.streetdeal}*${this.curModel.streetdeal})\n`;
    output += 'Contacts:\n';
    this.curModel.areas.forEach((a) => {
      output += `  ${a.area} (rolls: ${a.rolls}/cost:${a.points}pts)\n`;
      output += `  ${a.details}\n\n`;
    });
    return output;
  }

  private updateModel() {
    this._model.next(this.curModel);
    this.cache = this.curModel;
  }

  private get cache(): HotStuffModel {
    const results = new HotStuffModel();
    if (localStorage && localStorage[this.key]) {
      const storage = JSON.parse(localStorage[this.key]);
      results.streetdeal = storage.streetdeal;
      if (storage.areas) {
        storage.areas.forEach((a) => {
          results.areas.push(new HotStuffArea(a));
        });
      }
    }
    return results;
  }

  private set cache(model: HotStuffModel) {
    if (localStorage) {
      localStorage.setItem(this.key, JSON.stringify(model));
    }
  }
}
