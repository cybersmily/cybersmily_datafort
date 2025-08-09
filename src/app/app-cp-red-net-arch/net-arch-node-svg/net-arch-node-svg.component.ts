import { faFile, faLock, faCogs, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { CPRedIconTypeSettings, CPRedNetArchNode, NetArchNode } from './../models';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cs-net-arch-node-svg',
    templateUrl: './net-arch-node-svg.component.svg',
    styleUrls: ['./net-arch-node-svg.component.css'],
    standalone: false
})
export class NetArchNodeSvgComponent implements OnInit {
  faFile = faFile;
  faLock = faLock;
  faCogs = faCogs;
  faSkullCrossbones = faSkullCrossbones;

  levels: Array<number> = new Array<number>();

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  counter(levels: number): Array<any> {
    return new Array<any>(levels);
  }

  @Input()
  node: CPRedNetArchNode = new CPRedNetArchNode();

  @Input()
  iconColors: CPRedIconTypeSettings = new CPRedIconTypeSettings();

  @Input()
  defaultDV: number = 6;

  private ids = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  @Output()
  updateNode: EventEmitter<CPRedNetArchNode> = new EventEmitter<CPRedNetArchNode>();

  iconOffset = 60;
  selectedId = '';

  getMainPolygon() {
    return `1,20
    20,1
    ${this.diagramWidth - 42},1
    ${this.diagramWidth - 2},40
    ${this.diagramWidth - 2},${this.diagramHeight - 22}
    ${this.diagramWidth - 22},${this.diagramHeight - 2}
    180,${this.diagramHeight - 2}
    160,${this.diagramHeight - 22}
    160,130 140,110
    20, 110
    2, 80
    `;
  }

  getInnerPolygon() {
    return `6,26
    24,6
    ${this.diagramWidth - 48},6
    ${this.diagramWidth - 8},46
    ${this.diagramWidth - 8},${this.diagramHeight - 28}
    ${this.diagramWidth - 28},${this.diagramHeight - 10}
    184,${this.diagramHeight - 10}
    168,${this.diagramHeight - 26}
    166,124 146,104
    24, 104
    6, 74
    `;
  }



  getOffset(num: number):number {
    return this.iconOffset + ( num * this.iconOffset);
  }

  getName(name: string): string {
    if (name.length < 21 ) {
      return name;
    }
    return name.substring(0,18) + '...';
  }

  getColor(node: CPRedNetArchNode): string {
    if (node.color !== '') {
      return node.color;
    }
    switch(node.type) {
      case 'file':
        return this.iconColors.file.color;
      case 'password':
        return this.iconColors.password.color;
      case 'program':
        return this.iconColors.program.color;
      case 'controller':
        return this.iconColors.controlNode.color;
      default:
        return 'black';
    }
  }

  getBGColor(node: CPRedNetArchNode): string {
    if (node.bgColor !== '') {
      return node.bgColor;
    }
    switch(node.type) {
      case 'file':
        return this.iconColors.file.bgColor;
      case 'password':
        return this.iconColors.password.bgColor;
      case 'program':
        return this.iconColors.program.bgColor;
      case 'controller':
        return this.iconColors.controlNode.bgColor;
      default:
        return 'white';
    }
  }

  splitName(name: string): Array<string> {
    return name.split(' ');
  }

  get diagramHeight(): number {
    const ht = (this.node.numberOfBranches * 75) + 130;
    return (ht < 300) ? 300 : ht;
  }

  get diagramWidth(): number {
    return (this.node.numberOfLevels * this.iconOffset) + this.iconOffset + 50;
  }

  get canAdd(): boolean {
    return this.node.numberOfFloors < 18;
  }

  showAdd(level: number): boolean {
    return level > 2 && this.canAdd;
  }

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }

  getIcon(type: string): any {
    switch (type) {
      case 'file':
        return this.faFile.icon[4];
      case 'controller':
        return this.faCogs.icon[4];
      case 'program':
        return this.faSkullCrossbones.icon[4];
    }
    return this.faLock.icon[4];
  }

  addNewNode(id: string) {
    if (!this.canAdd) {
      return;
    }
    const newNode = new CPRedNetArchNode();
    let idIndex = this.node.numberOfFloors;
    let newId = this.ids[idIndex];
    while (this.node.hasChild(newId) && idIndex < this.ids.length) {
      idIndex++;
      newId = this.ids[idIndex];
    }

    newNode.id = newId;
    newNode.name = newNode.type;
    newNode.dv = this.defaultDV;
    switch(newNode.dv){
      case 6:
        newNode.cost = 500;
        break;
      case 8:
        newNode.cost = 1000;
        break;
      case 10:
        newNode.cost = 5000;
        break;
      case 12:
        newNode.cost = 10000;
        break;
      default:
        newNode.cost = 500;
        break;
    }

    this.node.insertChild(id, newNode);
    this.updateNode.emit(this.node);
  }

  removeNode(id: string, level: number) {
    if( level > 3) {
      this.node.deleteChild(id);
      this.updateNode.emit(this.node);
    }
  }

}
