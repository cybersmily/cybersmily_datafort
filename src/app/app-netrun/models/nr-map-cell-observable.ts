import { BehaviorSubject } from 'rxjs';
import { NRMapCell } from './nr-map-cell';

export class NRMapCellObservable {
  private _cell: BehaviorSubject<NRMapCell>  = new BehaviorSubject<NRMapCell>(new NRMapCell());
  MapCell = this._cell.asObservable();

  constructor(cell: NRMapCell) {
    this.update(cell);
  }

  update(cell: NRMapCell) {
    this._cell.next(cell);
    this._cell.complete();
  }

  getValue(): NRMapCell {
    return this._cell.getValue();
  }

  setAttributes(param: {isSelectable?: boolean, isSelected?: boolean, isVisited?: boolean}) {
    const cell = this._cell.getValue();
    cell.selectable = ( typeof param.isSelectable !== 'undefined') ? param.isSelectable : cell.selectable;
    cell.selected = ( typeof param.isSelected !== 'undefined') ? param.isSelected : cell.selected;
    cell.hasVisited = ( typeof param.isVisited !== 'undefined') ? param.isVisited : cell.hasVisited;
    this._cell.next(cell);
    this._cell.complete();
  }

  getHeight() {
    return this._cell.getValue().height;
  }

  getWidth() {
    return this._cell.getValue().width;
  }
}
