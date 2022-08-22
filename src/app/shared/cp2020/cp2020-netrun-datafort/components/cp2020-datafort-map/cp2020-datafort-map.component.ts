import { Coord } from '../../../../models/coord';
import { NrNodeType, NrMapDefaults, NrNodeIcons } from '../../enums';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Cp2020DatafortBuilderService } from '../../services';
import { Cp2020NrDatafort } from '../../models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp2020-datafort-map',
  templateUrl: './cp2020-datafort-map.component.html',
  styleUrls: ['./cp2020-datafort-map.component.css'],
})
export class Cp2020DatafortMapComponent implements OnInit {
  NrNodeIcons = NrNodeIcons;
  NrNodeType = NrNodeType;

  currDatafort: Cp2020NrDatafort;
  scale: number = 1.0;
  grid: Array<any>;
  svgWidth = 100;
  svgHeight = 100;

  constructor(
    private datafortBuilderService: Cp2020DatafortBuilderService,
    private sanitizer: DomSanitizer
  ) {}

  get gridSize(): number {
    return NrMapDefaults.GRID_SIZE * this.scale;
  }

  get quarterGrid(): number {
    return Math.floor(this.gridSize / 4);
  }

  trashX(x: number, gridSize: number): number {
    return x * gridSize + gridSize;
  }

  trashY(y: number, gridSize: number): number {
    return gridSize * y;
  }

  ngOnInit(): void {
    this.datafortBuilderService.datafort.subscribe((datafort) => {
      this.currDatafort = new Cp2020NrDatafort(datafort);
      this.grid = new Array();
      for (let row = 0; row < this.currDatafort.rows; row++) {
        const rowArray = new Array();
        for (let col = 0; col < this.currDatafort.columns; col++) {
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

  removeDatawall(x: number, y: number) {
    this.datafortBuilderService.removeDataWall(x, y);
  }

  removeCodegate(coord: Coord) {
    this.datafortBuilderService.removeCodegate(coord);
  }

  removeCPU(x: number, y: number) {
    this.datafortBuilderService.removeCPUNode(x, y);
  }

  removeMemory(x: number, y: number) {
    this.datafortBuilderService.removeMUNode(x, y);
  }

  removeRemote(coord: Coord) {
    this.datafortBuilderService.removeRemote(coord);
  }

  removeDefense(coord: Coord) {
    this.datafortBuilderService.removeDefense(coord);
  }

  sanitize(element: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(element);
  }

  getRemoteIcon(type: NrNodeType): string {
    switch (type) {
      case NrNodeType.ALARM:
        return NrNodeIcons.ALARM;
      case NrNodeType.AUTOFACTORY:
        return NrNodeIcons.AUTOFACTORY;
      case NrNodeType.DOOR:
        return NrNodeIcons.DOOR;
      case NrNodeType.ELEVATOR:
        return NrNodeIcons.ELEVATOR;
      case NrNodeType.TERMINAL:
        return NrNodeIcons.TERMINAL;
      case NrNodeType.LDL:
        return NrNodeIcons.LDL;
      case NrNodeType.CAMERA:
        return NrNodeIcons.CAMERA;
      case NrNodeType.MICROPHONE:
        return NrNodeIcons.MICROPHONE;
      case NrNodeType.VIDEO:
        return NrNodeIcons.VIDEO;
      case NrNodeType.HOLODISPLAY:
        return NrNodeIcons.HOLODISPLAY;
      case NrNodeType.PRINTER:
        return NrNodeIcons.PRINTER;
      case NrNodeType.MANIPULATOR:
        return NrNodeIcons.MANIPULATOR;
      case NrNodeType.VEHICLE:
        return NrNodeIcons.VEHICLE;
      default:
        return '';
    }
  }
}
