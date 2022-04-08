import { NrLoadMapsService } from './nr-load-maps.service';
import { Coord } from '../../shared/models/coord';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoadedMap, NRRegion, NRRegionMap, NrCityList, NRDataFort, NrGridCell } from '../models';
import { NR_WORLD_MAP } from '../models/nr-constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NrMapDataService {
  // Region list is the full list of regions from the data.json file
  private _map: BehaviorSubject<NRRegionMap> = new BehaviorSubject<NRRegionMap>(new NRRegionMap());
  currMap = this._map.asObservable();

  private _rows: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  mapRows = this._rows.asObservable();

  // Region list is the full list of regions from the data.json file
  private regionList: BehaviorSubject<NRRegion[]> = new BehaviorSubject<NRRegion[]>(new Array<NRRegion>());
  castRegionList = this.regionList.asObservable();

  // rows = new Array<Array<any>>();

  selectedCell: Coord = new Coord();

  // list of all the cities in the map. These are also considered
  // ldls
  cityList: NrCityList;

  activemap: string;

  // this is for the current index being used with the loadMaps
  currMapIndex = -1;

  // save all previous visited maps in this array for easy loading
  // as well as saving the different grid cells visited.
  loadedMaps: LoadedMap[] = new Array<LoadedMap>();

  constructor(private nrLoadMapService: NrLoadMapsService) {
    this.activemap = '';
    // only load the region/city data from teh data.json file.
    if (!this.cityList || this.regionList.value.length < 1) {
      this.cityList = new NrCityList();
      this.nrLoadMapService.nrMapData.subscribe(data => {
        try {
          // create the regionlist and set it for all components subscribing to it.
          this.regionList.next(this.InitiateRegionsList(data.regions));
          this.cityList.InitiateCityList(data.cities);
          this.GetMap(NR_WORLD_MAP);
        } catch (error) {
          console.error('Failed to load the region and city maps:',error);
        }
      });
    }
  }

  /**
  * Initiates the region list from the json file and
  * sort the list based on region name.
  * @private
  * @param {*} regionsObj - json obj of regions.
  * @returns list of NRRegion objects
  * @memberof NrMapService
  */
  private InitiateRegionsList(regionsObj): NRRegion[] {
    const list: NRRegion[] = regionsObj;
    list.sort((a, b) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
    return list;
  }


  /**
   * GetMap
   * This resets the current map to either one that has been loaded
   * before or retrieve the json to build a new one.
   * This also loops to create the grid for the new map.
   *
   * @param {string} map
   * @returns
   * @memberof NrMapDataService
   */
  GetMap(map: string, ldlName?: string) {
    // return if the map doesn't exist.
    if (!map || map === '') {
      return;
    }
    // see if the map has already been loaded.
    this.currMapIndex = this.loadedMaps.findIndex(search => {
      return search.fileName === map;
    });
    if (this.currMapIndex >= 0) {
      this._map.next(this.loadedMaps[this.currMapIndex].mapObj);
      this._rows.next(this.loadedMaps[this.currMapIndex].mapGrid);
      if (ldlName) {
        const coord = this.findLDL(ldlName);
        this.setSelectCell(coord.x, coord.y);
      }
    } else {
      // load the map from file.
      this.nrLoadMapService.getNRMap(map).subscribe(data => {
        // create and initialize the region map
        const regMap = new NRRegionMap();
        const newGrid = this.createGrid(data.ny, data.nx);
        this._rows.next(newGrid);
        regMap.initializeMap(data);
        // add the newly load map to the loadedMap array for faster loading.
        this.currMapIndex = this.loadedMaps.push({
          fileName: map,
          mapObj: regMap,
          mapGrid: newGrid
        }) - 1;
        this._map.next(regMap);
        if (ldlName) {
          const coord = this.findLDL(ldlName);
          this.setSelectCell(coord.x, coord.y);
        }
      });
    }
  }


  /**
   * createGrid
   * This will create a grid object to store if a cell
   * has been visited or is selected.
   *
   * @param {number} rows
   * @param {number} columns
   * @returns {Array<any>}
   * @memberof NrMapDataService
   */
  createGrid(rows: number, columns: number): Array<any> {
    const r = (rows < 0) ? 1 : rows;
    const c = (columns < 0) ? 1 : columns;
    const grid = new Array();
    for (let i = 0; i < r; i++) {
      const col = new Array();
      for (let j = 0; j < c; j++) {
        col.push(new NrGridCell());
      }
      grid.push(col);
    }
    return grid;
  }

  /**
   * Searches the maplist provided to find the map to load.
   *
   * @param {string} mapName - Name of the map to load
   * @param {any[]} mapList - list to search for the map and get the filepath
   * @returns {Observable<string>} - observable to subscribe to. Return 'done'.
   * @memberof NrMapService
   */
  findAndSetMap(mapName: string, isCity: boolean, ldlName?: string) {
    let mapList: any[] = new Array();
    if (isCity) {
      mapList = this.cityList.list;
    } else {
      mapList = this.regionList.value;
    }
    const mapObj = mapList.find((map) => {
      return map.name === mapName;
    });

    if (mapObj && mapObj.map) {
      if (ldlName) {
        this.GetMap(mapObj.map, ldlName);
      } else {
        this.GetMap(mapObj.map);
      }
    }
  }

  /**
   * Set the map to the world map. Also selecting the ldl
   * the user enters the map on.
   *
   * @memberof NrMapService
   */
  goToWorld(ldl?: string, navigate?: string) {
    // determine if this an active run
    if (navigate) {
      this.unsetSelected();
    }
    this.GetMap(NR_WORLD_MAP, navigate);
  }

  /**
   * Set the map to a city map. This will also select the grid cell
   * the user entered the map through.
   *
   * @param {string} cityName - Name of the city to load.
   * @param {string} [ldl] - ldl used to enter the map.
   * @memberof NrMapService
   */
  goToCity(cityName: string, navigate?: string) {
    // determine if this an active run
    if (navigate) {
      this.unsetSelected();
      navigate = 'LDL';
    }
    this.findAndSetMap(cityName, true, navigate);
  }

  // TODO: can this be combined with the above?
  goToRegion(regionName: string, navigate?: string) {
    // determine if this an active run
    if (navigate) {
      this.unsetSelected();
    }
    // set the new region
    this.findAndSetMap(regionName, false, navigate);
  }

  unsetSelected() {
    // unset the current selected.
    const grid: Array<any> = this._rows.getValue();
    grid[this.selectedCell.x][this.selectedCell.y].s = false;
    this.loadedMaps[this.currMapIndex].mapGrid = grid;
    this._rows.next(grid);
  }

  findLDL(ldlName: string): Coord {
    const node = this._map.value.dforts.find(search => {
      return search.name === ldlName;
    });
    const location = new Coord();
    if (node && node.row) {
      location.x = node.row;
      location.y = node.column;
    }
    return location;
  }

  /**
   * Get the current region name the user is in.
   *
   * @returns {string} - Name of the region/city
   * @memberof NrMapService
   */
  getCurrRegionName(): string {
    return this._map.value.name;
  }

  /**
 * Get the current map's type, city, world, region, space
 *
 * @returns {string} - map type
 * @memberof NrMapService
 */
  getCurrRegionType(): string {
    return this._map.value.type;
  }

  /**
   * Refresh the maps, clearing all to the base.
   *
   * @memberof NrMapService
   */
  resetMaps() {
    this.loadedMaps = new Array<LoadedMap>();
    this.GetMap(NR_WORLD_MAP);
    this.selectedCell = new Coord();
    this.activemap = '';
  }


  /**
   * getDateForts()
   * gets the dataforts found in the row/column.
   * @param {number} row - row number to find
   * @param {number} column - column number to find
   * @returns {NRDataFort[]} - filter array of dataforts within the row/column coordinates
   * @memberof NrMapDataService
   */
  getDataForts(row: number, column: number): NRDataFort[] {
    if (this._map.value && this._map.value.dforts) {
      return this._map.value.dforts.filter(d => ((d.row === row) && (d.column === column)));
    } else {
      return new Array<NRDataFort>();
    }
  }


  /**
   * determine if the cell is selectable.
   *
   * @param {number} row row to test
   * @param {number} column column to test
   * @returns {Boolean} if the cell is selectable return true
   * @memberof NrMapDataService
   */
  isSelectable(row: number, column: number, map: string): boolean {
    // if the a selected cell is set yet, all cells are selectable.
    if ((this.selectedCell.x < 0 || this.selectedCell.y < 0)) {
      return true;
    } else if (this._rows.value[row] && map === this.activemap) {
      const topRow = (row === (this._rows.value.length - 1)) ? this._rows.value.length : (row + 1);
      const bottomRow = (row < 1) ? 0 : (row - 1);

      const rightCol = (column === (this._rows.value[row].length - 1)) ? 0 : (column + 1);
      const leftCol = (column < 1) ? this._rows.value[row].length : (column - 1);

      if (row === this.selectedCell.x && (this.selectedCell.y === leftCol || this.selectedCell.y === rightCol)) {
        return true;
      }

      if (column === this.selectedCell.y && (this.selectedCell.x === bottomRow || this.selectedCell.x === topRow)) {
        return true;
      }

    } else {
      return false;
    }
  }


  /**
   * returns true if the cell is the current selected one.
   *
   * @param {number} row - row number of the tested cell
   * @param {number} column - column number of the tested cell
   * @returns - true if the row/column is currently selected.
   * @memberof NrMapDataService
   */
  isSelected(row: number, column: number): boolean {
    if (this._rows.value[row] && this._rows.value[row][column]) {
      return this._rows.value[row][column].s;
    }
    return false;
  }


  /**
   * Determine if a cell has been visited.
   *
   * @param {number} row - row number to test
   * @param {number} column - column number to test
   * @returns {boolean} - true if the cell has been visited
   * @memberof NrMapDataService
   */
  isVisited(row: number, column: number): boolean {
    if (this._rows.value[row] && this._rows.value[row][column]) {
      return this._rows.value[row][column].v;
    }
    return false;
  }

  /**
   * Set the row/number cell to be the current selected cell.
   *
   * @param {number} row - row number of the cell
   * @param {number} column - column number of the cell
   * @memberof NrMapDataService
   */
  setSelectCell(row: number, column: number) {
    if (row > -1 && column > -1) {
      this.activemap = this._map.getValue().name;
      const grid: Array<any> = this._rows.getValue();
      grid[row][column].v = true;
      grid[row][column].s = true;
      if (grid[this.selectedCell.x] && grid[this.selectedCell.x][this.selectedCell.y]) {
        grid[this.selectedCell.x][this.selectedCell.y].s = false;
      }
      this.loadedMaps[this.currMapIndex].mapGrid = grid;
      this._rows.next(grid);
      this.selectedCell.x = row;
      this.selectedCell.y = column;
    }
  }

}
