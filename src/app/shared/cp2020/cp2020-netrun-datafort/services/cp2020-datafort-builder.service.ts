import { Coord } from './../../../models/coord';
import { StorageKeys } from './../../../enums/storage-keys';
import { LocalStorageManagerService } from './../../../services/local-storage-manager/local-storage-manager.service';
import { Cp2020Program } from './../../cp2020-netrun-gear/models/cp2020-program';
import { NrNodeType } from './../enums/nr-node-type';
import { NrMapDefaults } from '../enums/nr-map-defaults';
import { NrDatafort } from './../models/nr-datafort';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020DatafortBuilderService {
  private _datafort = new BehaviorSubject<Cp2020NrDatafort>(
    new Cp2020NrDatafort()
  );
  datafort = this._datafort.asObservable();

  private _currDatafort: Cp2020NrDatafort;

  selectedTool: NrNodeType;

  constructor(private localStorageService: LocalStorageManagerService) {
    this.update(this.localStorageService.retrive<Cp2020NrDatafort>(StorageKeys.CP2020_NR_DATAFORT));
  }

  isToolSelected(nodeType: NrNodeType ): boolean {
    return this.selectedTool === nodeType;
  }


  update(datafort: NrDatafort) {
    if(datafort) {
      // validation on values
      datafort.rows = this.validateNumber(datafort.rows, NrMapDefaults.ROWS_MIN);
      datafort.columns = this.validateNumber(datafort.columns, NrMapDefaults.COLUMNS_MIN);
      datafort.cpu = this.validateNumber(datafort.cpu, NrMapDefaults.CPU_MIN, NrMapDefaults.CPU_MAX);
      datafort.datawallStr = this.validateNumber(datafort.datawallStr, NrMapDefaults.DATAWALL_STR_MIN, NrMapDefaults.DATAWALL_STR_MAX);
      datafort.codegates = datafort?.codegates?.map( cg => {
        return {
        str: this.validateNumber(cg.str, NrMapDefaults.CODEGATE_STR_MIN, NrMapDefaults.CODEGATE_STR_MAX),
        coord: {x: cg.coord.x, y: cg.coord.y}
      }});
    }

    this._currDatafort = new Cp2020NrDatafort(datafort);
    this.calculateMemoryUsed();
    this.calculateCost();
    this._datafort.next(this._currDatafort);
    this.localStorageService.store<Cp2020NrDatafort>(StorageKeys.CP2020_NR_DATAFORT, this._currDatafort);
  }

  updateNode(x: number, y: number) {
    if(this.selectedTool === NrNodeType.DATAWALL) {
      this._currDatafort.datawallNodes.push({x: x, y: y});
      this.update(this._currDatafort);
      return;
    }
    if(this.selectedTool === NrNodeType.CODEGATE) {
      this._currDatafort.codegates.push({str: 2, coord: {x: x, y: y}});
      this.update(this._currDatafort);
      return;
    }
    if(this.selectedTool === NrNodeType.CPU) {
      this._currDatafort.cpuNodes.push({x: x, y: y});
      this.update(this._currDatafort);
      return;
    }
    if(this.selectedTool === NrNodeType.MU){
      this._currDatafort.muNodes.push({x: x, y: y});
      this.update(this._currDatafort);
      return;
    }
    if(this.selectedTool === NrNodeType.PROGRAM){
      this._currDatafort.defenses.push({name: '', program: new Cp2020Program(), coord:{x: x, y: y}});
      this.update(this._currDatafort);
      return;
    }
    if (this.selectedTool != null) {
      this._currDatafort.remotes.push({name: '', type: this.selectedTool, coord:{x: x, y: y}});
      this.update(this._currDatafort);
      return;
    }
  }

  removeDataWall(x: number, y: number) {
    this.removeNodeFromList('datawallNodes', x, y);
  }

  removeCodegate(coord: Coord) {
    this.removeNodeCoordFromList('codegates', coord);
  }

  removeCPUNode(x: number, y: number) {
    this.removeNodeFromList('cpuNodes', x, y);
  }

  removeMUNode(x: number, y: number) {
    this.removeNodeFromList('muNodes', x, y);
  }

  removeRemote(coord:Coord) {
    this.removeNodeCoordFromList('remotes', coord);
  }

  removeDefense(coord:Coord) {
    this.removeNodeCoordFromList('defenses', coord);
  }

  private removeNodeFromList(prop: string, x: number, y: number) {
    const index = this._currDatafort[prop]?.findIndex(n => n.x === x && n.y === y);
    if (index > -1) {
      this._currDatafort[prop].splice(index, 1);
      this.update(this._currDatafort);
    }
  }

  private removeNodeCoordFromList(prop: string, coord: Coord) {
    const index = this._currDatafort[prop]?.findIndex(n => n.coord.x === coord.x && n.coord.y === coord.y);
    if (index > -1) {
      this._currDatafort[prop].splice(index, 1);
      this.update(this._currDatafort);
    }
  }

  reset() {
    this.update(new Cp2020NrDatafort());
  }

  private calculateMemoryUsed() {
    const fileUsage = this._currDatafort.mu.reduce( (sum, mu) => sum + (isNaN(mu.value) ? 0 : mu.value),0);
    const programUsage = this._currDatafort.defenses.reduce( (sum, prog) => sum + prog.program.mu, 0);
    this._currDatafort.muUsed = fileUsage + programUsage;
  }

  private calculateCost() {
    const cpuCost = this._currDatafort.cpu * NrMapDefaults.CPU_COST;
    const skillCost = this._currDatafort.skills.reduce((sum, skill) => sum + this.calculateSkillCost(skill.value), 0);
    //let codegateCost = (this._currDatafort.codegateNodes.length - this._currDatafort.cpu) * 2000;
    //codegateCost +=
    this._currDatafort.cost = cpuCost + skillCost;
  }

  private calculateSkillCost(rank: number): number {
    if( rank < 5) {
      return 200;
    }
    return 200 + (100 * (rank - 4));
  }

  private validateNumber(value:number, min:number, max?:number ): number {
    let result = value < min ? min : value;
    if (max != null ) {
      result = result > max ? max : result;
    }
    return result;

  }
}
