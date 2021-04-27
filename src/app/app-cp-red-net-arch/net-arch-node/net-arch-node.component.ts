import { faSkullCrossbones, faCogs, faFile, faLock, faPen, faTimes, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { CPRedNetArchNode, CPRedIconTypeSettings } from './../models';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cs-net-arch-node',
  templateUrl: './net-arch-node.component.html',
  styleUrls: ['./net-arch-node.component.css']
})
export class NetArchNodeComponent implements OnInit {

  faSkullCrossbones = faSkullCrossbones;
  faCogs = faCogs;
  faFile = faFile;
  faLock = faLock;
  faPen = faPen;
  faTimes = faTimes;
  faThumbtack = faThumbtack;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };

  @Input()
  node: CPRedNetArchNode;

  @Input()
  defaultDV: number;

  @Input()
  iconSettings: CPRedIconTypeSettings;

  @Output()
  updateNode: EventEmitter<CPRedNetArchNode> = new EventEmitter<CPRedNetArchNode>();

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  getIcon(type: string): any {
    if (type) {
      switch (type) {
        case 'program':
          return this.faSkullCrossbones;
        case 'file':
          return this.faFile;
        case 'controller':
          return this.faCogs;
      }
    }
    return this.faLock;
  }

  selectedColor: string;

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

  update() {
    this.updateNode.emit(this.node);
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

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
