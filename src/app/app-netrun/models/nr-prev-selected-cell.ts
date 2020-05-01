import { NRMapCell } from "./nr-map-cell";

export class PrevSelectedCell {
  regionIndex: number;
  prevIndex: number;
  cell: NRMapCell;
  constructor() {
    this.regionIndex = -1;
    this.prevIndex = -1;
    this.cell = new NRMapCell();
  }
}
