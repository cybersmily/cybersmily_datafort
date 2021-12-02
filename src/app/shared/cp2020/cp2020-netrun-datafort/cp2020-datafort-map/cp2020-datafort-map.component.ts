import { NrMapDefaults } from './../models/nr-map-defaults';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp2020-datafort-map',
  templateUrl: './cp2020-datafort-map.component.html',
  styleUrls: ['./cp2020-datafort-map.component.css']
})
export class Cp2020DatafortMapComponent implements OnInit {

  @Input()
  datafort: Cp2020NrDatafort = new Cp2020NrDatafort();

  currDataFort: Cp2020NrDatafort;
  scale: number = 1.0;
  grid: Array<any>;
  svgWidth = 100;
  svgHeight = 100;

  constructor() { }

  get gridSize(): number {
    return NrMapDefaults.GRID_SIZE * this.scale;
  }

  ngOnInit(): void {
    this.grid = new Array(this.datafort.rows).map( row => new Array<any>(this.datafort.columns));
    this.svgWidth = this.datafort.columns * this.gridSize;
    this.svgHeight = this.datafort.rows * this.gridSize;
  }

}
