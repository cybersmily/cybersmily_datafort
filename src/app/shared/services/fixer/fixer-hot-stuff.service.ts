import { HotStuffModel } from './../../models/fixer/hot-stuff-model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HotStuffArea } from './../../models/fixer/hot-stuff-area';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
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
    return this.curModel.areas.reduce( (a, b) => a + b.points, 0);
  }

  addArea(area: HotStuffArea) {
    if (area.points + this.spentPoints <= this.totalPoints) {
      const newArea = new HotStuffArea();
      newArea.area = area.area;
      newArea.rolls = area.rolls;
      newArea.details = area.details;
      this.curModel.areas.push(newArea);
      this.curModel.areas.sort( (a, b) => (a.area > b.area) ? 1 : -1);
      this.updateModel();
    }
  }

  deleteArea(index: number) {
    this.curModel.areas.splice(index, 1);
    this.updateModel();
  }

  updateArea(area: HotStuffArea) {
    const index = this.curModel.areas.findIndex( a => a.area === area.area);
    this.curModel.areas[index] = area;
    this.updateModel();
  }

  reset() {
    this.curModel = new HotStuffModel();
    this.updateModel();
  }

  toString(): string {
    let output = 'Hot Stuff Contacts\n';
    output += `Streetdeal: ${this.curModel.streetdeal}\n`;
    output += `Network Points:\n`;
    output += `  spent - ${this.spentPoints}\n`;
    output += `  total - ${this.totalPoints}(${this.curModel.streetdeal}*${this.curModel.streetdeal})\n`;
    output += 'Contacts:\n';
    this.curModel.areas.forEach( a => {
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
      if ( storage.areas) {
        storage.areas.forEach(a => {
          results.areas.push(new HotStuffArea(a));
        });
      }
    }
    console.log(results);
    return results;
  }

  private set cache(model: HotStuffModel) {
    if (localStorage) {
      localStorage.setItem(this.key, JSON.stringify(model));
    }
  }
}
