import { CPRedNetArchChartsService } from './c-p-red-net-arch-charts.service';
import { CPRedNetArchNode } from './../models/c-p-red-net-arch-node';
import { CPRedNetFloorChartEntry, CPRedNetFloorCharts } from './../models/c-p-red-net-floor-charts';
import { DiceService } from './../../shared/services/dice/dice.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { NetArchProgram } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CPRedNetArchService {

  private _architect = new BehaviorSubject<CPRedNetArchNode>(null);
  architect = this._architect.asObservable();

  private _architectAsArray = new BehaviorSubject<Array<Array<CPRedNetArchNode>>>(new Array<Array<CPRedNetArchNode>>());
  architectAsArray = this._architectAsArray.asObservable();

  difficulty = 1;
  controllerCount = 0;

  private charts: CPRedNetFloorCharts;
  private programList: Array<NetArchProgram>;
  private archArray = new Array<Array<CPRedNetArchNode>>(18);

  private ids = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private idNum = 0;

  constructor(private diceService: DiceService, private chartService: CPRedNetArchChartsService) {
  }


  /**
   * Updates the architect observables with a node and the array of nodes
   *
   * @param {CPRedNetArchNode} node
   * @memberof CPRedNetArchService
   */
  update(node: CPRedNetArchNode) {
    this.archArray = new Array<Array<CPRedNetArchNode>>();
    this.fillArray(node);
    this._architectAsArray.next(this.archArray);
    this._architect.next(new CPRedNetArchNode(node));
  }


  /**
   * fills the node array with each level
   *
   * @param {CPRedNetArchNode} node
   * @memberof CPRedNetArchService
   */
  fillArray(node: CPRedNetArchNode) {
    const index = node.level - 1;
    if (!this.archArray[index]) {
      this.archArray[index] = new Array<CPRedNetArchNode>();
    }
    this.archArray[index].push(node);
    if (node.branch.length === 1) {
      this.fillArray(node.branch[0]);
    } else if (node.branch.length === 2) {
      this.fillArray(node.branch[0]);
      this.fillArray(node.branch[1]);
    }
  }


  /**
   * Generates an architect based on the number of floors and the  difficulty
   *
   * @param {boolean} rollFloors
   * @param {boolean} rollDifficulty
   * @param {number} floors
   * @memberof CPRedNetArchService
   */
  generateArch(rollFloors: boolean, rollDifficulty: boolean, floors: number) {
    this.charts = new CPRedNetFloorCharts();
    this.chartService.charts
    .pipe( take(1))
    .subscribe( chart => {
      this.programList = chart.programs;
      chart.lobby.forEach( entry => {
        const newEntry = new CPRedNetFloorChartEntry(entry);
        if (newEntry.type === 'program') {
          newEntry.programs = new Array<NetArchProgram>();
          entry.programs.forEach( prog => {
            const p = this.programList.find( item => item.name === prog);
            newEntry.programs.push(p);
          });
        }
        this.charts.lobby.push( newEntry);
      });
      chart.floors.forEach( chart => {
        const list = new Array<CPRedNetFloorChartEntry>();
        chart.forEach( entry => {
          const newEntry = new CPRedNetFloorChartEntry(entry);
          if (newEntry.type === 'program') {
            newEntry.programs = new Array<NetArchProgram>();
            entry.programs.forEach( prog => {
              const p = this.programList.find( item => item.name === prog);
              newEntry.programs.push(p);
            });
          }
          list.push( new CPRedNetFloorChartEntry(newEntry));
        });
        this.charts.floors.push(list);
      });
      this.createArch(rollFloors,  rollDifficulty, floors);
    });
  }

  createArch(rollFloors: boolean, rollDifficulty: boolean, floors: number){
    this.controllerCount = 0;
    this._architect.next(new CPRedNetArchNode());
    this.archArray = new Array<Array<CPRedNetArchNode>>(18);
    floors = this.generateNumberOfFloors(rollFloors, floors);
    if (rollDifficulty) {
      this.difficulty = this.diceService.generateNumber(0, 3);
    }
    const firstFloor = this.generateLobby();
    firstFloor.branch[0].addChild(this.generateFloor(floors - 2, 3));

    // there can only be 1 node at the bottom floor
    const index = this.archArray.findIndex(n => !n);
    this.archArray.splice(index);
    const level = this.archArray.length - 1;
    if (this.archArray[level] && this.archArray[level].length > 1) {
      const deleteNodes = this.archArray[level].splice(1);
      let id = this.archArray[level][0].id;
      deleteNodes.forEach(n => {
        const node = firstFloor.deleteChild(n.id);
        firstFloor.insertChild(id, node);
      });
    }
    this.update(firstFloor);
  }


  /**
   * generate the number of floors based on parameters.
   *
   * @private
   * @param {boolean} rollFloors
   * @param {number} floors
   * @return {*}
   * @memberof CPRedNetArchService
   */
  private generateNumberOfFloors(rollFloors: boolean, floors: number) {
    return (rollFloors) ? this.diceService.generateNumber(3, 18) : ( floors > 2) ? floors : 3;
  }

  /**
   * Generates the first 2 floors of the net arch.
   *
   * @private
   * @return {*}  {CPRedNetArchNode}
   * @memberof CPRedNetArchService
   */
  private generateLobby(): CPRedNetArchNode{
    const firstFloor = this.generateNetArchNode(true, 1, this.ids[0]);
    this.archArray[0] = [firstFloor];

    const secondFloor = this.generateNetArchNode(true, 2, this.ids[1]);
    this.archArray[1] = [secondFloor];

    this.idNum = 2;
    firstFloor.addChild(secondFloor);
    return firstFloor;
  }


  /**
   * Generates a floor for the architect
   *
   * @param {number} floor
   * @param {number} level
   * @return {*}  {CPRedNetArchNode}
   * @memberof CPRedNetArchService
   */
  generateFloor(floor: number, level: number): CPRedNetArchNode {
    floor--;
    const node = this.generateNetArchNode(false, level, this.ids[this.idNum]);
    level++;
    this.idNum++;
    // other floor
    if (floor > 0) {
      const isBranched = (this.diceService.generateNumber(1, 10) > 6);
      if (isBranched && floor > 1) {
        const first = this.diceService.generateNumber(1, floor - 1);
        const second = floor - first;
        node.addChild(this.generateFloor(first, level));
        node.addChild(this.generateFloor(second, level));
      } else {
        node.addChild(this.generateFloor(floor, level));
      }
    }
    const i = node.level - 1;
    if (!this.archArray[i]) {
      this.archArray[i] = new Array<CPRedNetArchNode>();
    }
    this.archArray[node.level - 1].push(node);

    return node;
  }


  /**
   * Deteremines if the maximum allowed controller nodes has been reached.
   *
   * @readonly
   * @type {boolean}
   * @memberof CPRedNetArchService
   */
  get isControllerMaxed(): boolean {
    if (this._architect.getValue().numberOfFloors < 7 && this.controllerCount > 1) {
      return true;
    } else if (this._architect.getValue().numberOfFloors < 13 && this.controllerCount > 2) {
      return true;
    }
    return false;
  }


  /**
   * Genereates a floor node to be added to the architect
   *
   * @param {boolean} isLobby
   * @return {*}  {CPRedNetArchNode}
   * @memberof CPRedNetArchService
   */
  generateNetArchNode(isLobby: boolean, level: number, id: string): CPRedNetArchNode {
    const lobby = this.charts.lobby;
    const chart = this.charts.floors[this.difficulty];
    let floor: any = {};
    let die = 0;
    do {
      die = (isLobby) ? this.diceService.generateNumber(0, lobby.length - 1) : this.diceService.generateNumber(0, chart.length - 1);
      floor = (isLobby) ? lobby[die] : chart[die];
    } while (floor.type === 'controller' && this.isControllerMaxed);
    if (floor && (floor.type === 'program' || floor.type === 'password')) {
      // remove a program/password from the list of options
      if (isLobby) {
        this.charts.lobby.splice(die, 1);
      } else {
        this.charts.floors[this.difficulty].splice(die, 1);
      }
    }
    if (floor && floor.type === 'controller') {
      this.controllerCount++;
    }
    const node = new CPRedNetArchNode(floor);
    node.id = id;
    node.level = level;
    return node;
  }

  getJSON(): string {
    return JSON.stringify(this._architect.getValue());
  }
}
