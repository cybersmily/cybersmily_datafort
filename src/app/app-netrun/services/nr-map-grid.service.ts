import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { NRMap, NRMapCell, NRMapRow, PrevSelectedCell, NRRegionMap } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NrMapGridService {

  // Region map will continue to change. Other components need
  // to react to these changes and should be subscribed.
  private _grid = new BehaviorSubject<Array<NRMapRow>>(new Array());
  currGrid = this._grid.asObservable();

  // the currently select grid cell the user clicked on last.
  private _selectedCell = new BehaviorSubject<NRMapCell>(new NRMapCell());
  selectedCell = this._selectedCell.asObservable();

  prevSelected: Array<PrevSelectedCell> = new Array<PrevSelectedCell>();

  private dimensions: {
    rows: number,
    columns: number,
    gridsize: number,
    rowOffset: number,
    columnOffset: number,
    rowLast: number,
    columnLast: number
  };

  prevGrids: any = {};

  constructor() { }

  initialize ( nrMap: NRMap) {
    // get the grid dimensions
    this.dimensions = {
      rows: nrMap.ny,
      columns: nrMap.nx,
      gridsize: nrMap.gridsize,
      rowOffset: nrMap.offsety,
      columnOffset: nrMap.offsetx,
      rowLast: nrMap.ly,
      columnLast: nrMap.lx
    };

    // create the grid
    this.createGrid(this.dimensions.rows, this.dimensions.columns);
  }


  createGrid( rows: number, columns: number ) {
    const newGrid = new Array();
    // create the grid
    for ( let i = 0; i < rows; i++) {
      const newRow = new NRMapRow();
      // set the height of the row
      if (i === 0 ) {
        newRow.height = this.dimensions.rowOffset;
      } else if (i === this.dimensions.rows - 1) {
        newRow.height = this.dimensions.rowLast;
      } else {
        newRow.height = this.dimensions.gridsize;
      }

      for ( let j = 0; j < columns; j++) {
        // create the observable for the grid cell.
        const cell =  new NRMapCell();
        cell.column = j;
        cell.row = i;
        cell.width = (j === 0) ? this.dimensions.columnOffset :
          ( j === (columns - 1)) ? this.dimensions.columnLast : this.dimensions.gridsize;
        cell.height = (i === 0) ? this.dimensions.rowOffset :
        ( i === rows - 1) ? this.dimensions.rowLast : this.dimensions.gridsize;
        cell.hasVisited = false;
        cell.selectable = false;
        cell.selected = false;
        newRow.cells.push( cell );
      }
      newGrid.push(newRow);
    }
    this._grid.next(newGrid);
  }

  /**
   * marks a cell if it has been visited already.
   * @param {number} row - row of the cell
   * @param {number} col - column of the cell
   * @param {boolean} mark - mark it true or false.
   * @memberof NrMapService
   */
  visitCell(row: number, col: number, mark: boolean, isMapChange: boolean, currMapIndex: number): Observable<NRMapCell> {
    let grid = this._grid.value;
    const selectedGrid = this._selectedCell.value;
    // check if the visited cell is the current cell, if so, visit and set previous select to current
    if ( selectedGrid.column === col && selectedGrid.row === row ) {
      // reset the map if only 1 cell has been visited so far.
      if (this.prevSelected.length < 1) {
        this.resetMaps();
        return;
      }
      // remove the current selected grid cell by unsetting values
      grid = this.setSelectables(grid, selectedGrid.column, selectedGrid.row, false);
      grid[selectedGrid.row].cells[selectedGrid.column].selected = false;
      grid[selectedGrid.row].cells[selectedGrid.column].hasVisited = false;
      // get the previous cell to set it to the selected cell
      const newSelected = this.prevSelected.shift();
      col = newSelected.cell.column;
      row = newSelected.cell.row;
      // mark = !mark;

    } else {
      // only add to the array a valid cell
      if (selectedGrid.column >= 0) {
        const prevGrid = new PrevSelectedCell();
        prevGrid.regionIndex = isMapChange ?  this.prevSelected[0].regionIndex : currMapIndex;
        prevGrid.cell = selectedGrid;
        this.prevSelected.unshift(prevGrid);
      }
    }

    // change the selected cell
    if (this.prevSelected.length > 0 && this.prevSelected[0].cell.row > -1 && this.prevSelected[0].cell.column > -1) {
      // first deselect the surrounding cell
      const pRow = this.prevSelected[0].cell.row;
      const pCol = this.prevSelected[0].cell.column;
      const pIndex = this.prevSelected[0].regionIndex;
      // if there was a map change, set unset the previous cells
      if (isMapChange && pIndex > -1) {
        /*
        this.loadedMaps[pIndex].mapObj = this.setSelectables(
          this.loadedMaps[pIndex].mapObj,
          pCol, pRow, false);
        this.loadedMaps[pIndex].mapObj.map[pRow].cells[pCol].selected = false;
        */
      } else {
        grid = this.setSelectables(grid, pCol, pRow, false);
        grid[pRow].cells[pCol].selected = false;
      }
    }

    // set the current cell as hasVisited
    grid = this.setSelectables(grid, col, row, true);
    grid[row].cells[col].selected = mark;
    grid[row].cells[col].hasVisited = mark;

    this._selectedCell.next(grid[row].cells[col]);
    this._grid.next(grid);
  }


  /**
   * Sets the selectable property of surrounding cells.
   *
   * @param {NRRegionMap} region - NRRegionMap to update
   * @param {number} col - Column number of the central cell
   * @param {number} row - Row number of the central cell
   * @param {boolean} isSelectable - value to set the Selectable property to.
   * @returns {NRRegionMap} - return the updated NRRegionMap.
   * @memberof NrMapService
   */
  setSelectables(grid: Array<NRMapRow>, col: number,
    row: number, isSelectable: boolean): Array<NRMapRow> {
    const lastIndex = grid[row].cells.length - 1;
    // check if the first column, if so, last column should be
    // selectable
    if (col === 0) {
      grid[row].cells[lastIndex].selectable = isSelectable;
    }
    if (col > 0) {
      grid[row].cells[col - 1].selectable = isSelectable;
    }
    // if the last column, then first column should be selectable.
    if (col === lastIndex ) {
      grid[row].cells[0].selectable = isSelectable;
    }
    if ( col < lastIndex) {
      grid[row].cells[col + 1].selectable = isSelectable;
    }
    if ( row > 0 ) {
      grid[row - 1].cells[col].selectable = isSelectable;
    }
    if ( row < (this.dimensions.rows)) {
      grid[row + 1].cells[col].selectable = isSelectable;
    }
    grid[row].cells[col].selectable = isSelectable;
    return grid;
  }

  /**
   * Check to see if there is a selected grid.
   *
   * @returns {boolean} - true if there is a selected grid.
   * @memberof NrMapService
   */
  isGridSelected(): boolean {
    return this._selectedCell.value.column > -1 &&
      this._selectedCell.value.row > -1;
  }


  /**
   * Refresh the maps, clearing all to the base.
   *
   * @memberof NrMapService
   */
  resetMaps() {
    this._selectedCell.next(new NRMapCell());
    this._grid.next(new Array<NRMapRow>());
    this.prevSelected = new Array<PrevSelectedCell>();
  }
}
