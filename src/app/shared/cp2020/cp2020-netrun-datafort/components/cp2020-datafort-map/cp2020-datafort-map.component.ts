import { Coord } from '../../../../models/coord';
import { NrNodeType, NrMapDefaults, NrNodeIcons } from '../../enums';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Cp2020DatafortBuilderService } from '../../services';
import { Cp2020NrDatafort } from '../../models';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DndDropEvent, DropEffect, EffectAllowed } from 'ngx-drag-drop';

@Component({
  selector: 'cs-cp2020-datafort-map',
  templateUrl: './cp2020-datafort-map.component.html',
  styleUrls: ['./cp2020-datafort-map.component.css'],
})
export class Cp2020DatafortMapComponent implements OnInit {
  NrNodeIcons = NrNodeIcons;
  NrNodeType = NrNodeType;

  effectAllowed: EffectAllowed = 'move';

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

  disableDrop(x: number, y: number): boolean {
    return this.datafortBuilderService.cellHasNode(x, y);
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

  onDrop(event: DndDropEvent, col: number, row: number): void {
    if (event.data?.add) {
      switch (event.data?.icon) {
        case NrNodeType.ALARM:
        case NrNodeType.AUTOFACTORY:
        case NrNodeType.DOOR:
        case NrNodeType.ELEVATOR:
        case NrNodeType.TERMINAL:
        case NrNodeType.LDL:
        case NrNodeType.CAMERA:
        case NrNodeType.MICROPHONE:
        case NrNodeType.VIDEO:
        case NrNodeType.HOLODISPLAY:
        case NrNodeType.PRINTER:
        case NrNodeType.MANIPULATOR:
        case NrNodeType.VEHICLE:
          this.datafortBuilderService.addRemoteNode(event.data?.icon, col, row);
          break;
        case NrNodeType.PROGRAM:
          this.datafortBuilderService.addProgram(col, row);
          break;
        case NrNodeType.CODEGATE:
          this.datafortBuilderService.addCodeGate(col, row);
          break;
        case NrNodeType.CPU:
          this.datafortBuilderService.addCPU(col, row);
          break;
        case NrNodeType.MU:
          this.datafortBuilderService.addMU(col, row);
          break;
        case NrNodeType.DATAWALL:
          this.datafortBuilderService.addDataWall(col, row);
          break;
        default:
      }
    }
  }

  rootSVG = null;
  selectedSVGElement = null;
  selectedNode: NrNodeType = null;
  startingColRow: { col: number; row: number } = null;
  selectedNodeIndex: number = null;

  makeDraggable(event) {
    this.rootSVG = event.target;
  }

  startDrag(event): void {
    if (event.target.parentElement.classList.contains('draggable')) {
      const x = event.target.parentElement.getAttributeNS(null, 'x');
      const y = event.target.parentElement.getAttributeNS(null, 'y');
      this.startingColRow = {
        col: this.arrayIndex(x) + 1,
        row: this.arrayIndex(y) + 1,
      };
      this.selectedSVGElement = event.target.parentElement.parentElement;
      this.selectedNode = Number(
        this.selectedSVGElement.getAttributeNS(null, 'nodeType')
      );
      this.selectedNodeIndex = Number(
        this.selectedSVGElement.getAttributeNS(null, 'nodeIndex')
      );
    }
  }

  drag(event): void {
    if (this.selectedSVGElement) {
      event.preventDefault();
      const coord = this.getMousePosition(event);
      this.selectedSVGElement.querySelectorAll('svg').forEach((child) => {
        child.setAttributeNS(null, 'x', coord.x);
        child.setAttributeNS(null, 'y', coord.y);
      });
    }
  }

  endDrag(event): void {
    if (this.selectedSVGElement) {
      const x = this.selectedSVGElement.firstChild.getAttributeNS(null, 'x');
      const y = this.selectedSVGElement.firstChild.getAttributeNS(null, 'y');
      const col = this.arrayIndex(x);
      const row = this.arrayIndex(y);
      if (!this.disableDrop(col, row)) {
        //move icon
        switch (this.selectedNode) {
          case NrNodeType.ALARM:
          case NrNodeType.AUTOFACTORY:
          case NrNodeType.DOOR:
          case NrNodeType.ELEVATOR:
          case NrNodeType.TERMINAL:
          case NrNodeType.LDL:
          case NrNodeType.CAMERA:
          case NrNodeType.MICROPHONE:
          case NrNodeType.VIDEO:
          case NrNodeType.HOLODISPLAY:
          case NrNodeType.PRINTER:
          case NrNodeType.MANIPULATOR:
          case NrNodeType.VEHICLE:
            this.datafortBuilderService.updateRemoteNode(
              this.selectedNodeIndex,
              col,
              row
            );
            break;
          case NrNodeType.PROGRAM:
            this.datafortBuilderService.updateProgramNode(
              this.selectedNodeIndex,
              col,
              row
            );
            break;
          case NrNodeType.CODEGATE:
            this.datafortBuilderService.updateCodeGate(
              this.selectedNodeIndex,
              col,
              row
            );
            break;
          case NrNodeType.CPU:
            this.datafortBuilderService.updateCPU(
              this.selectedNodeIndex,
              col,
              row
            );
            break;
          case NrNodeType.MU:
            this.datafortBuilderService.updateMU(
              this.selectedNodeIndex,
              col,
              row
            );
            break;
          case NrNodeType.DATAWALL:
            this.datafortBuilderService.updateWall(
              this.selectedNodeIndex,
              col,
              row
            );
            break;
          default:
        }

        this.selectedSVGElement = null;
        this.startingColRow = null;
        this.selectedNode = null;
        this.selectedNodeIndex = -1;
      }
    }
  }

  dragLeave(event): void {
    if (this.selectedSVGElement) {
      this.datafortBuilderService.update(this.currDatafort);
      //move icon

      this.selectedSVGElement = null;
      this.startingColRow = null;
      this.selectedNode = null;
      this.selectedNodeIndex = -1;
    }
  }

  private arrayIndex(num: number): number {
    return Math.ceil(num / this.gridSize) - 1;
  }

  private getMousePosition(event): Coord {
    const ctm = this.rootSVG.getScreenCTM();
    return {
      x: (event.clientX - ctm.e) / ctm.a,
      y: (event.clientY - ctm.f) / ctm.d,
    };
  }
}
