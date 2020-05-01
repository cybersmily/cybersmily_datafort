import { Coord } from '../models';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NrMapPositionService {

  // track the current position of the user with mouse over.
  private _currPosition = new BehaviorSubject<Coord>(new Coord());
  currPosition = this._currPosition.asObservable();

  constructor() { }

    /**
   * Set coordinates that can be subscribed to.
   *
   * @param {*} x - X/Column value to set position
   * @param {*} y - Y/Row value to set position
   * @memberof NrMapService
   */
  setPosition(x, y) {
    const coord = new Coord();
    coord.x = x;
    coord.y = y;
    this._currPosition.next(coord);
  }
}
