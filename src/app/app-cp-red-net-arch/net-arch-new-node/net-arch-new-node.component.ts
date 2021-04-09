import { CPRedNetArchNode, iconSettings, CPRedIconTypeSettings } from './../models/net-arch-node';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'cs-net-arch-new-node',
  templateUrl: './net-arch-new-node.component.html',
  styleUrls: ['./net-arch-new-node.component.css']
})
export class NetArchNewNodeComponent implements OnInit {
  node: CPRedNetArchNode = new CPRedNetArchNode();

  @Input()
  iconSettings: CPRedIconTypeSettings;

  @Input()
  defaultDV: number;

  selectedColor: string;

  @Output()
  updateNode: EventEmitter<CPRedNetArchNode> = new EventEmitter<CPRedNetArchNode>();

  constructor() { }

  ngOnInit(): void {
    this.node = new CPRedNetArchNode();
    this.node.dv = this.defaultDV;
  }

  update() {
    this.updateNode.emit(this.node);
  }

  get color(): string {
    if(this.node.color && this.node.color !== '') {
      return this.node.color;
    }
    switch(this.node.type) {
      case 'file':
        return this.iconSettings.file.color;
      case 'program':
        return this.iconSettings.program.color;
      case 'password':
        return this.iconSettings.password.color;
      case 'controller':
        return this.iconSettings.controlNode.color;
    }
  }

  get bgColor(): string {
    if(this.node.bgColor && this.node.bgColor !== '') {
      return this.node.bgColor;
    }
    switch(this.node.type) {
      case 'file':
        return this.iconSettings.file.bgColor;
      case 'program':
        return this.iconSettings.program.bgColor;
      case 'password':
        return this.iconSettings.password.bgColor;
      case 'controller':
        return this.iconSettings.controlNode.bgColor;
    }
  }

  changeType(e) {
    this.node.type = e.target.value
    if(this.node.type !== 'program')  {
      this.node.dv = this.defaultDV;
    }
    this.update();
  }

  changeBgColor() {
    this.node.bgColor = this.selectedColor;
    this.update();
  }

  changeIconColor() {
    this.node.color = this.selectedColor;
    this.update();
  }

  changeColor($event: ColorEvent) {
    this.selectedColor = $event.color.hex;
  }

  setSelectedColor(color: string) {
    this.selectedColor = color;
  }


}
