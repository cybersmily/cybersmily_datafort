import { CPRedNetArchChartsService } from './../service/c-p-red-net-arch-charts.service';
import { faFile, faSave, faSkullCrossbones, faCogs, faLock } from '@fortawesome/free-solid-svg-icons';
import { CPRedIconTypeSettings, CPRedNetArchNode, NetArchProgram } from './../models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorEvent } from 'ngx-color';

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

  programList: Array<NetArchProgram> = new Array<NetArchProgram>();
  selectedProgram: NetArchProgram;
  selectedColor: string;
  selectedNode: CPRedNetArchNode = new CPRedNetArchNode();

  @Input()
  node: CPRedNetArchNode = new CPRedNetArchNode();

  @Input()
  iconSettings: CPRedIconTypeSettings;

  @Input()
  defaultDV: number;


  @Output()
  updateNode: EventEmitter<CPRedNetArchNode> = new EventEmitter<CPRedNetArchNode>();

  constructor( private chartService: CPRedNetArchChartsService) { }

  ngOnInit(): void {
    this.chartService.programs.subscribe(data => {
      this.programList = data.sort( (a, b) => a.name.localeCompare(b.name));
    });
    this.selectedNode = new CPRedNetArchNode(this.node);
  }

  saveNode() {
    console.log('emitted',this.selectedNode);
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
  }

  changeType(e) {
    this.selectedNode.type = e.target.value
    if(this.selectedNode.type !== 'program')  {
      this.selectedNode.dv = this.defaultDV;
      this.selectedNode.programs = undefined;
    } else {
      this.selectedNode.programs = new Array<NetArchProgram>();
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
        console.log(this.selectedProgram);
        this.selectedNode.programs.push( JSON.parse(JSON.stringify(this.selectedProgram)));
        if (this.selectedNode.name === '') {
          this.selectedNode.name = this.selectedProgram.name;
        }
        this.update();
      }
    }

  }

  addPrograms(count: number): boolean {
    return count < 3;
  }

}
