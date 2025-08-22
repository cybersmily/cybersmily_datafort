import { CPRedNetArchChartsService } from './../service/c-p-red-net-arch-charts.service';
import { faSkullCrossbones, faCogs, faFile, faLock, faPen, faTimes, faThumbtack, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CPRedNetArchNode, CPRedIconTypeSettings, NetArchProgram } from './../models';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cs-net-arch-node',
    templateUrl: './net-arch-node.component.html',
    styleUrls: ['./net-arch-node.component.css'],
    standalone: false
})
export class NetArchNodeComponent implements OnInit {

  faSkullCrossbones = faSkullCrossbones;
  faCogs = faCogs;
  faFile = faFile;
  faLock = faLock;
  faPen = faPen;
  faTimes = faTimes;
  faThumbtack = faThumbtack;
  faPlus = faPlus;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };

  @Input()
  node: CPRedNetArchNode = new CPRedNetArchNode();

  @Input()
  defaultDV: number = 6;

  @Input()
  iconSettings: CPRedIconTypeSettings = new CPRedIconTypeSettings();

  @Output()
  updateNode: EventEmitter<CPRedNetArchNode> = new EventEmitter<CPRedNetArchNode>();

  constructor(private modalService: BsModalService, private chartService: CPRedNetArchChartsService) { }

  ngOnInit(): void {
  }

  saveNode(node: CPRedNetArchNode) {
    this.updateNode.emit(node);
    this.modalRef.hide();
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
    if (this.node.type !== 'program') {
      if (this.node.dv < 8) {
        this.node.cost = 500;
      } else if (this.node.dv < 10) {
        this.node.cost = 1000;
      } else if (this.node.dv < 12) {
        this.node.cost = 5000;
      } else if (this.node.dv > 11) {
        this.node.cost = 10000;
      }
    }
  }

  changeType(e) {
    this.node.type = e.target.value
    if(this.node.type !== 'program')  {
      this.node.dv = this.defaultDV;
      this.node.programs = undefined;
    } else {
      this.node.programs = new Array<NetArchProgram>();
    }
    this.update();
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
