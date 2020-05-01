import { MAP_TYPE } from '../models/nr-constants';
import { NRMapCell, NRDataFort } from '../models';
import { Component, OnInit, Input, HostBinding} from '@angular/core';
import { NrMapPositionService, NrMapGridService, NrMapDataService } from '../services';

@Component({
  selector: 'cs-nr-map-cell',
  templateUrl: './nr-map-cell.component.html',
  styleUrls: ['./nr-map-cell.component.css']
})
export class NrMapCellComponent implements OnInit {

  @Input()
  column: number = 0;

  @Input()
  row: number = 0;

  @Input()
  mapType: string = '';

  @Input()
  dataForts: NRDataFort[] = new Array<NRDataFort>();

  @Input()
  cellWidth: string = '';

  @Input()
  cellHeight: string = '';

  @Input()
  mapName: string = '';

  gridCell: NRMapCell = new NRMapCell();

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
    private nrMapDataService: NrMapDataService,
    private nrPositionService: NrMapPositionService) { }

  ngOnInit() {
    this.setStyleClasses(this.mapType);
    this.nrMapDataService.mapRows.subscribe( rows => {
      this.setStyleClasses(this.mapType);
    });
  }

  setStyleClasses( mapType: string) {
    this.height = this.cellHeight;
    this.cellStyle.height = this.cellHeight;
    this.width = this.cellWidth;
    this.cellStyle.width = this.cellWidth;
    this.cellClasses.csdNRSelectable = this.nrMapDataService.isSelectable(this.row, this.column, this.mapName);
    this.cellClasses.csdNRSelected = this.nrMapDataService.isSelected(this.row, this.column);
    this.cellClasses.csdHasVisited = this.nrMapDataService.isVisited(this.row, this.column);
    this.cellClasses.csdCityGrid = (mapType === MAP_TYPE.CITY);
  }

  onClick(event) {
    if (this.dataForts && this.dataForts.length > 0 && this.dataForts[0].img === 'df_spc' && this.mapType === 'c') {
      return;
    }
    if ( this.nrMapDataService.isSelectable(this.row, this.column, this.mapName)) {
      this.nrMapDataService.setSelectCell(this.row, this.column);
      this.setStyleClasses(this.mapType);
    }
  }

  onOver(event) {
    if ( this.row > -1 && this.column > -1) {
      this.nrPositionService.setPosition(this.column, this.row);
      this.setStyleClasses(this.mapType);
    }
  }
}
