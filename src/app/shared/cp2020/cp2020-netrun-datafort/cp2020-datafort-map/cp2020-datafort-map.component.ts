import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NrNodeIcons } from './../enums/nr-node-icons';
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
  NrNodeIcons = NrNodeIcons;

  currDatafort: Cp2020NrDatafort;
  scale: number = 1.0;
  grid: Array<any>;
  svgWidth = 100;
  svgHeight = 100;

  constructor(private datafortBuilderService: Cp2020DatafortBuilderService, private sanitizer: DomSanitizer) { }

  get gridSize(): number {
    return NrMapDefaults.GRID_SIZE * this.scale;
  }

  get quarterGrid(): number {
    return Math.floor(this.gridSize/4) ;
  }

  ngOnInit(): void {
    this.datafortBuilderService.datafort.subscribe(datafort => {
      this.currDatafort = new Cp2020NrDatafort(datafort);
      this.grid = new Array()
      for(let row = 0; row < this.currDatafort.rows; row++) {
        const rowArray = new Array();
        for(let col = 0; col < this.currDatafort.columns; col++) {
          rowArray.push(col);
        }
        this.grid.push(rowArray);
      }
      this.svgWidth = this.currDatafort.columns * this.gridSize;
      this.svgHeight = this.currDatafort.rows * this.gridSize;
    });
  }

  updateNode(x: number, y: number) {
    this.datafortBuilderService.updateNode(x, y);
  }

  removeDatawall(x:  number, y: number) {
    console.log('removeDatawall');
  }

  sanitize(element: string): SafeHtml {
    console.log(element);
    return this.sanitizer.bypassSecurityTrustHtml(element);
  }

}
