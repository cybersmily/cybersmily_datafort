import { Observable } from 'rxjs';
import { NRDataFort } from './../models/nr-data-fort';
import { Component, OnInit } from '@angular/core';
import { NrTrackerService,  NrMapDataService } from '../services';
import { MAP_TYPE } from '../models/nr-constants';
import { NRRegionMap, NRMapRow } from '../models';
import { SPINNER, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'cs-nr-map-grid',
    templateUrl: './nr-map-grid.component.html',
    styleUrls: ['./nr-map-grid.component.css'],
    standalone: false
})
export class NrMapGridComponent implements OnInit {
  currMap: NRRegionMap;
  rows: Observable<Array<any>>;
  // store the number of rows/columns
  spinner = SPINNER;

  // map image modifications.
  mapImage = '/img/apps/regionmaps/nrworldmap.png';
  imgSize = {
    height: '0px',
    width: '0px',
    ['min-width']:  '0px',
    ['min-height']:  '0px',
  };

  tableStyle = {
    'height': '0px',
    'width': '0px'
  };
  mapTable = {
    height: '400px',
    width: '1000px'
  };

  containerSize = {
    height: '400px',
    width: '1000px',
    ['min-width']:  '1000px',
    ['min-height']:  '400px',
  };

  cellClass = {
    cityGrid: false
  };

  // use to capture the mouse poistion to track teh movement.
  mouseposition: any = {};

  gridClasses = {
    csdMapGrid: true,
    csdUnselected: true
  };

  showGhost = true;

  constructor(
    private ngxService: NgxUiLoaderService,
    public nrMapDataService: NrMapDataService,
    private nrTraceService: NrTrackerService,
    // private nrMapGridService: NrMapGridService
    ) { }

  ngOnInit() {
    this.ngxService.start();
    // get the current map
    this.nrMapDataService.currMap.subscribe( map => {
      this.currMap = map;
      this.mapImage = '/' + map.img;
      this.styleMap();
      // this.nrMapGridService.initialize(this.currMap);
      this.ngxService.stop();
    });
    this.rows = this.nrMapDataService.mapRows;
  }

  styleMap() {
    const ht = this.currMap.h + 'px';
    const wd = this.currMap.w + 'px';
    this.mapTable.height = ht;
    this.mapTable['min-height'] = ht;
    this.mapTable.width = wd;
    this.mapTable['min-width'] = wd;
    this.mapTable['border-color'] = 'white';
    if ( !this.hasMap()) {
      if ( this.currMap.type === MAP_TYPE.CITY) {
        this.mapTable['background-color'] = 'white';
        this.mapTable['border-color'] = 'black';
        this.cellClass.cityGrid = true;
      } else {
        this.mapTable['background-color'] = 'black';
      }
    } else {
      this.mapTable['background-color'] = 'transparent';
    }

    this.containerSize.height = ht;
    this.containerSize['min-height'] = ht;
    this.containerSize.width = wd;
    this.containerSize['min-width'] = wd;

    this.imgSize.height = ht;
    this.imgSize['min-height'] = ht;
    this.imgSize.width = wd;
    this.imgSize['min-width'] = wd;
  }



  hasMap(): boolean {
    return (this.currMap.img) ? true : false;
  }

  refreshMap() {
    this.ngxService.start();
    this.nrMapDataService.resetMaps();
    this.nrTraceService.resetTraces();
    // this.nrMapGridService.resetMaps();
  }

  getRowHeightPx(rowIndex) {
    if ( rowIndex <= 0 ) {
      return this.currMap.offsety + 'px';
    } else if ( rowIndex >= (this.currMap.ny - 1)) {
      return this.currMap.ly + 'px';
    } else {
      return this.currMap.gridsize + 'px';
    }
  }
  getColumnWidthPx(colIndex) {
    if ( colIndex <= 0 ) {
      return this.currMap.offsetx + 'px';
    } else if ( colIndex >= (this.currMap.nx - 1)) {
      return this.currMap.lx + 'px';
    } else {
      return this.currMap.gridsize + 'px';
    }
  }


  /**
   * getDataforts will get the data forts that are in a cell.
   *
   * @param {number} row - row of the cell
   * @param {number} col - column of the cell
   * @returns {NRDataFort[]} - returns the data forts found within that cell.
   * @memberof NrMapGridComponent
   */
  getDataforts(row: number, col: number):  NRDataFort[] {
    return this.nrMapDataService.getDataForts(row, col);
  }
}
