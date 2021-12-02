import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { NrMapDefaults } from '../enums/nr-map-defaults';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp2020-datafort-map',
  templateUrl: './cp2020-datafort-map.component.html',
  styleUrls: ['./cp2020-datafort-map.component.css']
})
export class Cp2020DatafortMapComponent implements OnInit {

  currDataFort: Cp2020NrDatafort;
  scale: number = 1.0;
  grid: Array<any>;
  svgWidth = 100;
  svgHeight = 100;

  constructor(private datafortBuilderService: Cp2020DatafortBuilderService) { }

  get gridSize(): number {
    return NrMapDefaults.GRID_SIZE * this.scale;
  }

  ngOnInit(): void {
    this.datafortBuilderService.datafort.subscribe(datafort => {
      this.currDataFort = new Cp2020NrDatafort(datafort);
      this.grid = new Array(this.currDataFort.rows).map( row => new Array<any>(this.currDataFort.columns));
      this.svgWidth = this.currDataFort.columns * this.gridSize;
      this.svgHeight = this.currDataFort.rows * this.gridSize;
    });
  }

}
