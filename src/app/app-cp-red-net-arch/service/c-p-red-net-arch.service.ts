import { faFile, faLock, faCogs, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { CPRedNetFloorCharts } from './../models/c-p-red-net-floor-charts';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CPRedNetArchNode, NetArchNode } from './../models/net-arch-node';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CPRedNetArchService {
  faFile = faFile;
  faLock = faLock;
  faCogs = faCogs;
  faSkullCrossbones = faSkullCrossbones;

  private _architect = new BehaviorSubject<CPRedNetArchNode>(
    new CPRedNetArchNode()
  );
  architect = this._architect.asObservable();

  private _floors = new BehaviorSubject<number>(10);
  numOfFloors = this._floors.asObservable();

  private _architectAsArray = new BehaviorSubject<Array<Array<CPRedNetArchNode>>>(new Array<Array<CPRedNetArchNode>>());
  architectAsArray = this._architectAsArray.asObservable();

  private _svg = new BehaviorSubject<string>('');
  svg = this._svg.asObservable();

  difficulty = 1;

  private charts: CPRedNetFloorCharts;
  private archArray = new Array<Array<CPRedNetArchNode>>(18);

  private ids = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private idNum = 0;

  private level = 3;

  constructor(private diceService: DiceService) {
    this.charts = new CPRedNetFloorCharts();
  }

  addChild() {
    const node = this._architect.getValue();
    this._architect.next(node);
  }
  removeChild() {
    const node = this._architect.getValue();
    this._architect.next(node);
  }

  update(node: CPRedNetArchNode) {
    this.archArray = new Array<Array<CPRedNetArchNode>>();
    this.fillArray(node);
    this._architectAsArray.next(this.archArray);
    this._architect.next(new CPRedNetArchNode(node));
  }

  fillArray(node: CPRedNetArchNode) {
    const index = node.level - 1;
    if (!this.archArray[index]) {
      this.archArray[index] = new Array<CPRedNetArchNode>();
    }
    this.archArray[index].push(node);
    if (node.branch.length === 1) {
      this.fillArray(node.branch[0]);
    } else if(node.branch.length === 2) {
      this.fillArray(node.branch[0]);
      this.fillArray(node.branch[1]);
    }
  }

  moveTo(id: number, level: number) {}

  generateArch(rollFloors:boolean, rollDifficulty: boolean, floors: number) {
    this._architect.next( new CPRedNetArchNode());
    this.archArray = new Array<Array<CPRedNetArchNode>>(18);
    if (rollFloors) {
      floors = this.diceService.generateNumber(3,18);
      this._floors.next(floors);
    } else {
      floors = (floors && floors > 2)? floors : 3;
      this._floors.next(floors);
    }
    if (rollDifficulty) {
      this.difficulty = this.diceService.generateNumber(0,3);
    }
    const firstFloor = this.generateNetArchNode(true);
    firstFloor.level = 1;
    firstFloor.id = this.ids[0];
    this.archArray[0] = [firstFloor];

    const secondFloor = this.generateNetArchNode(true);
    secondFloor.id = this.ids[1];
    secondFloor.level = 2;
    this.archArray[1] = [secondFloor];
    this.idNum = 2;
    secondFloor.addChild(this.generateFloor(floors - 2, 3));
    firstFloor.addChild(secondFloor);
    // there can only be 1 node at the bottom floor
    const index = this.archArray.findIndex( n => !n);
    this.archArray.splice(index);
    const level = this.archArray.length - 1;
    if (this.archArray[level] && this.archArray[level].length > 1) {
      const deleteNodes =  this.archArray[level].splice(1);
      let id = this.archArray[level][0].id;
      deleteNodes.forEach( n=> {
         const node = firstFloor.deleteChild(n.id);
         firstFloor.insertChild(id, node);
      });
    }
    this._architectAsArray.next(this.archArray);
    this._architect.next(firstFloor);
  }

  generateFloor(floor: number, level: number): CPRedNetArchNode {
    floor--;
    const node = this.generateNetArchNode(false);
    node.level = level;
    level += 1;
    node.id = this.ids[this.idNum];
    this.idNum++;
    // other floor
    if ( floor > 0) {
      const isBranched = (this.diceService.generateNumber(1,10) > 6);
      if (isBranched && floor > 1) {
        const first = this.diceService.generateNumber(1,floor - 1);
        const second = floor - first;
        node.addChild(this.generateFloor(first, level));
        node.addChild(this.generateFloor(second, level));
      } else {
        node.addChild(this.generateFloor(floor, level));
      }
    }
    const i = node.level - 1;
    if(!this.archArray[i] ) {
      this.archArray[i] = new Array<CPRedNetArchNode>();
    }
    this.archArray[node.level - 1].push(node);

    return node;
  }

  generateNetArchNode(isLobby: boolean): CPRedNetArchNode {
    const node = new CPRedNetArchNode();
      const die = (isLobby) ? this.diceService.generateNumber(0, 5) : this.diceService.generateNumber(0, 15);
      const floor = (isLobby) ? this.charts.lobby[die] : this.charts.floors[this.difficulty][die];
      node.cost = floor.cost;
      node.desc = floor.name;
      node.name = floor.name;
      node.type = floor.type;
      node.dv = floor.dv;
    return node;
  }

  generateSVG() {
    const node = this.createCircles(this._architect.getValue(), 50, 25);
    let svg = `
    <svg style="width:100%" height="${this.level * 100}">
      <g>
      ${node}
      </g>
    </svg>`;
    this._svg.next(svg);
  }

  private createCircles(node:CPRedNetArchNode, x: number, offset: number): string {
    this.level = (node.level < this.level) ? this.level : node.level;
    let circle = `<circle cx='${x}%' cy='${node.level * 70}' r='15' fill='#000000'></circle>`;
    circle += `<circle cx='${x}%' cy='${node.level * 70}' r='14' fill='#ffffff'></circle>`;
    circle += `<g transform='translate(20,8)'><text x='${x}%' y='${(node.level * 70)}'>${node.id}</text></g>`;
    circle += `<g transform='translate(-6,-8)'><svg x='${x}%' y='${(node.level * 70)}'><g>
      <path transform='scale(0.03)'
       fill="currentColor"
       d="${this.getIcon(node.type)}"
       class="csd-net-icon"
       >
      </path>
      </g></svg></g>`;
      circle += `<circle class='neticon' cx='${x}%' cy='${node.level * 70}' r='14' fill='#555555' fill-opacity='0.1' (mouseover)="hover(${node.id})"></circle>`;
    if (node.branch && node.branch.length === 1) {
      circle += this.createCircles(node.branch[0], x, offset);
      circle += `<line x1="${x}%" y1="${(node.level * 70) + 15}" x2="${x}%" y2="${(node.level * 70) + 55}" style="stroke: rgb(0, 0, 0);stroke-width: 2;"></line>`;
    }
    if (node.branch && node.branch.length === 2) {
      circle += this.createCircles(node.branch[0], (x - offset), (offset/2));
      circle += `<line x1="${x}%" y1="${(node.level * 70) + 15}" x2="${x}%" y2="${(node.level * 70) + 30}" style="stroke: rgb(0, 0, 0);stroke-width: 2;"></line>`;
      circle += `<line x1="${(x - offset)}%" y1="${(node.level * 70) + 30}" x2="${(x + offset)}%" y2="${(node.level * 70) + 30}" style="stroke: rgb(0, 0, 0);stroke-width: 2;"></line>`;
      circle += `<line x1="${(x - offset)}%" y1="${(node.level * 70) + 30}" x2="${(x - offset)}%" y2="${(node.level * 70) + 55}" style="stroke: rgb(0, 0, 0);stroke-width: 2;"></line>`;
      circle += `<line x1="${(x + offset)}%" y1="${(node.level * 70) + 30}" x2="${(x + offset)}%" y2="${(node.level * 70) + 55}" style="stroke: rgb(0, 0, 0);stroke-width: 2;"></line>`;
      circle += this.createCircles(node.branch[1], (x + offset), (offset/2));
    }
    return circle;
  }

  private getIcon(type: string) {
    switch(type){
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
