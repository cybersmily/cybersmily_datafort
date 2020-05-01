import { NRMapCell } from '../models/nr-map-cell';

export class NRMapRow {
  height: number;
  cells: NRMapCell[];
  constructor() {
    this.height = 0;
    this.cells = new Array<NRMapCell>();
  }
}
