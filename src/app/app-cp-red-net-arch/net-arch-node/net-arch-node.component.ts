import { faSkullCrossbones, faCogs, faFile, faLock, faPen, faTimes, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { CPRedNetArchNode } from './../models/net-arch-node';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';

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

  isEdit: boolean = false;
  isShowDetails: boolean = false;

  @Input()
  node: CPRedNetArchNode;

  @Output()
  updateNode: EventEmitter<CPRedNetArchNode> = new EventEmitter<CPRedNetArchNode>();

  constructor() { }

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

  showDetails() {
    this.isShowDetails = !this.isShowDetails;
  }

  update() {
    this.updateNode.emit(this.node);
  }

  changeType(e) {
    this.node.type = e.target.value
    this.updateNode.emit(this.node);
  }
}
