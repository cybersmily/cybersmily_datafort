export class NRMapCell {
  hasVisited: boolean;
  row: number;
  column: number;
  width: number;
  height: number;
  selected?: boolean;
  selectable?: boolean;
  constructor() {
    this.hasVisited = false;
    this.row = -1;
    this.column = -1;
    this.width = 0;
    this.height = 0;
  }
}
