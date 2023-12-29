import { CPRedNetArchChartsService } from './../service/c-p-red-net-arch-charts.service';
import { faFile, faSave, faSkullCrossbones, faCogs, faLock, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CPRedIconTypeSettings, CPRedNetArchNode, NetArchProgram } from './../models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { CPRedDemon } from '../models/c-p-red-demon';

@Component({
  selector: 'cs-net-arch-new-node',
  templateUrl: './net-arch-new-node.component.html',
  styleUrls: ['./net-arch-new-node.component.css']
})
export class NetArchNewNodeComponent implements OnInit {
  faSave = faSave;
  faSkullCrossbones = faSkullCrossbones;
  faCogs = faCogs;
  faFile = faFile;
  faLock = faLock;
  faPlus = faPlus;
  faTrash = faTrash;

  programList: Array<NetArchProgram> = new Array<NetArchProgram>();
  demonList: Array<CPRedDemon> = new Array<CPRedDemon>();
  selectedProgram: NetArchProgram;
  selectedDemon : CPRedDemon;
  selectedColor: string;
  selectedNode: CPRedNetArchNode = new CPRedNetArchNode();

  @Input()
  node: CPRedNetArchNode = new CPRedNetArchNode();

  @Input()
  iconSettings: CPRedIconTypeSettings = new CPRedIconTypeSettings();

  @Input()
  defaultDV: number;


  @Output()
  updateNode: EventEmitter<CPRedNetArchNode> = new EventEmitter<CPRedNetArchNode>();

  constructor( private chartService: CPRedNetArchChartsService) { }

  ngOnInit(): void {
    this.chartService.programs.subscribe(data => {
      this.programList = data.sort( (a, b) => a.name.localeCompare(b.name));
    });
    this.chartService.demons.subscribe(data => {
      this.demonList = data.sort( (a, b) => a.name.localeCompare(b.name));
    });

    this.selectedNode = new CPRedNetArchNode(this.node);
  }

  saveNode() {
    this.updateNode.emit(this.selectedNode);
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
    if(this.selectedNode.color && this.selectedNode.color !== '') {
      return this.selectedNode.color;
    }
    switch(this.selectedNode.type) {
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
    if(this.selectedNode.bgColor && this.selectedNode.bgColor !== '') {
      return this.selectedNode.bgColor;
    }
    switch(this.selectedNode.type) {
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
    if (this.selectedNode.type !== 'program') {
      if (this.selectedNode.dv < 8) {
        this.selectedNode.cost = 500;
      } else if (this.selectedNode.dv < 10) {
        this.selectedNode.cost = 1000;
      } else if (this.selectedNode.dv < 12) {
        this.selectedNode.cost = 5000;
      } else if (this.selectedNode.dv > 11) {
        this.selectedNode.cost = 10000;
      }
    }

    if(this.selectedNode.type == 'controller' && this.selectedNode.demon) {
      this.selectedNode.cost += this.selectedNode.demon.cost;
    }
  }

  changeType(e) {
    this.selectedNode.type = e.target.value
    if(this.selectedNode.type == 'program')  {
      this.selectedNode.programs = new Array<NetArchProgram>();
      this.selectedNode.demon = null;

    } else if(this.selectedNode.type == 'controller'){
      this.selectedNode.programs = undefined;
    } else  {
      this.selectedNode.dv = this.defaultDV;
      this.selectedNode.programs = undefined;
      this.selectedNode.demon = null;
      
    }
    this.update();
  }

  changeBgColor() {
    this.selectedNode.bgColor = this.selectedColor;
    this.update();
  }

  changeIconColor() {
    this.selectedNode.color = this.selectedColor;
    this.update();
  }

  changeColor($event: ColorEvent) {
    this.selectedColor = $event.color.hex;
  }

  setSelectedColor(color: string) {
    this.selectedColor = color;
  }

  deleteProgram(index: number) {
    if (this.selectedNode.programs) {
      this.selectedNode.programs.splice(index,1);
      this.update();
    }
  }

  addSelectedProgram() {
    if (this.selectedNode.type === 'program') {
      if (!this.selectedNode.programs) {
        this.selectedNode["programs"] = new Array<NetArchProgram>();
      }
      if (this.selectedNode.programs.length < 3) {
        this.selectedNode.programs.push( JSON.parse(JSON.stringify(this.selectedProgram)));
        if (this.selectedNode.name === '') {
          this.selectedNode.name = this.selectedProgram.name;
        }
        this.update();
      }
    }
  }

  addSelectedDemon() {
    if (this.selectedNode.type === 'controller') {
      if (!this.selectedNode.demon) {
        this.selectedNode["demon"] = JSON.parse(JSON.stringify(this.selectedDemon))
        if (this.selectedNode.name === '') {
          this.selectedNode.name = this.selectedDemon.name;
        }
      }
      this.update();
    }

  }

  removeProgram(index: number) {
    if(this.selectedNode.programs) {
      this.selectedNode.programs.splice(index, 1);
    }
  }

  removeDemon() {
    this.selectedNode.demon = null;
  }

  addPrograms(count: number): boolean {
    return count < 3;
  }

}
