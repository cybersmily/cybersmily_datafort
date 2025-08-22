import { NrMapDataService } from './../services/nr-map-data.service';
import { MAP_TYPE } from '../models/nr-constants';
import { NRMapCell } from '../models';
import { Component, OnInit, Input, HostBinding} from '@angular/core';
import { NrMapPositionService, NrMapGridService } from '../services';

@Component({
    selector: 'cs-nrgridbox',
    templateUrl: './nrgridbox.component.html',
    styleUrls: ['./nrgridbox.component.css'],
    standalone: false
})
export class NrgridboxComponent implements OnInit {

  @Input()
  cell: NRMapCell;

  @Input()
  mapType: string;

  gridCell: NRMapCell;

  @HostBinding('style.width') width: string;

  @HostBinding('style.height') height: string;

  cellClasses = {
    csdNRCell: true,
    csdNRSelectable: false,
    csdNRSelected: false,
    csdHasVisited: false,
    csdHacked: false,
    csdCityGrid: false
  };

  cellStyle: any = {
    width: '20px',
    height: '20px'
  };

  constructor(
    private nrMapGridService: NrMapGridService,
    private nrPositionService: NrMapPositionService,
    private nrMapDataService: NrMapDataService) { }

  ngOnInit() {
    this.nrMapGridService.currGrid.subscribe( grid => {
      if (this.cell.selected) {
      }
      this.setStyleClasses(this.cell, this.mapType);
    });
  }

  setStyleClasses(cell: NRMapCell, mapType: string) {
    this.height = cell.height + 'px';
    this.cellStyle.height = cell.height + 'px';
    this.width = cell.width + 'px';
    this.cellStyle.width = cell.width + 'px';
    this.cellClasses.csdNRSelectable = cell.selectable;
    this.cellClasses.csdNRSelected = cell.selected;
    this.cellClasses.csdHasVisited = cell.hasVisited;
    this.cellClasses.csdCityGrid = (mapType === MAP_TYPE.CITY);
  }

  onClick(event) {
    if ( this.cell.selectable || !this.nrMapGridService.isGridSelected()) {
      // if clicking on the current cell, then roll it back
      const mark = (this.cell.selected) ? false : true;
      this.nrMapGridService.visitCell(this.cell.row, this.cell.column, mark, false, this.nrMapDataService.currMapIndex);
    }
  }

  onOver(event) {
    if ( this.cell) {
      this.nrPositionService.setPosition(this.cell.column, this.cell.row);
    }
  }
}
