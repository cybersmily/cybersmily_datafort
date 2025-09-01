import { NrTrackerService, NrMapGridService, NrMapDataService } from '../services';
import { MAP_TYPE } from '../models/nr-constants';
import { NRRegionMap, NRMapRow } from '../models';
import { Component, OnInit } from '@angular/core';
import { SPINNER, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'cs-nrmap',
    templateUrl: './nrmap.component.html',
    styleUrls: ['./nrmap.component.css'],
    standalone: false
})
export class NrmapComponent implements OnInit {
  currMap: NRRegionMap;
  currGrid: Array<NRMapRow>;
  spinner = SPINNER;
  mapImage = '/img/apps/regionmaps/nrworldmap.png';
  tableStyle = {
    'height': '0px',
    'width': '0px'
  };
  imgSize = {
    height: '0px',
    width: '0px',
    ['min-width']:  '0px',
    ['min-height']:  '0px',
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

  rows = [0, 1, 2];
  mouseposition: any = {};

  gridClasses = {
    csdMapGrid: true,
    csdUnselected: true
  };

  showGhost = true;

  constructor(
    public nrMapGridService: NrMapGridService,
    private ngxService: NgxUiLoaderService,
    private nrMapDataService: NrMapDataService,
    private nrTraceService: NrTrackerService) { }

  ngOnInit() {
    this.ngxService.start();
    // get the current map
    this.nrMapDataService.currMap.subscribe( map => {
      this.currMap = map;
      this.styleMap();
      this.nrMapGridService.initialize(this.currMap);
    });
    this.nrMapGridService.currGrid.subscribe( grid => {
      this.currGrid = grid;
      this.ngxService.stop();
      this.gridClasses.csdUnselected = typeof(this.nrMapGridService.selectedCell) === 'undefined';
    });
  }

  styleMap() {
    this.mapImage = '/' + this.currMap.img;
    this.imgSize.height = this.currMap.h + 'px';
    this.imgSize['min-height'] = this.currMap.h + 'px';
    this.imgSize.width = this.currMap.w + 'px';
    this.imgSize['min-width'] = this.currMap.w + 'px';

    this.containerSize.height = this.currMap.h + 4 + 'px';
    this.containerSize['min-height'] = this.currMap.h + 4 + 'px';
    this.containerSize.width = this.currMap.w + 4 + 'px';
    this.containerSize['min-width'] = this.currMap.w + 4 + 'px';

    this.tableStyle.height = this.currMap.h + 'px';
    this.tableStyle.width = this.currMap.w + 'px';
    if (this.currMap.type === MAP_TYPE.CITY) {
      this.tableStyle['border-color'] = 'black';
      this.cellClass.cityGrid = true;
    } else {
      this.tableStyle['border-color'] = 'white';
    }

  }


  hasMap(): boolean {
    return (this.currMap.img) ? true : false;
  }

  refreshMap() {
    this.ngxService.start();
    this.nrMapDataService.resetMaps();
    this.nrMapGridService.resetMaps();
    this.nrTraceService.resetTraces();
  }
}
