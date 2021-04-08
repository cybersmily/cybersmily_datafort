import { faFile, faLock, faCogs, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { CPRedIconTypeSettings, NetArchNode } from './../models/net-arch-node';
import { Component, Input, OnInit } from '@angular/core';
import { CPRedNetArchNode } from '../models/net-arch-node';

@Component({
  selector: 'cs-net-arch-node-svg',
  templateUrl: './net-arch-node-svg.component.svg',
  styleUrls: ['./net-arch-node-svg.component.css']
})
export class NetArchNodeSvgComponent implements OnInit {
  faFile = faFile;
  faLock = faLock;
  faCogs = faCogs;
  faSkullCrossbones = faSkullCrossbones;

  @Input()
  node: CPRedNetArchNode = new CPRedNetArchNode();

  @Input()
  iconColors: CPRedIconTypeSettings;

  iconOffset = 60;

  getOffset(num: number):number {
    return this.iconOffset + ( num * this.iconOffset);
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
  get diagramHeight(): number {
    return (this.node.numberOfBranches * 75) + 120;
  }

  get diagramWidth(): number {
    return (this.node.numberOfLevels * this.iconOffset) + this.iconOffset;
  }

  constructor() {}

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
}
