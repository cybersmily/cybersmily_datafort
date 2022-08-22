import { KeyValue } from '@angular/common';
import { Coord } from './../../../../models/coord';
import { StorageKeys } from './../../../../enums/storage-keys';
import { LocalStorageManagerService } from './../../../../services/local-storage-manager/local-storage-manager.service';
import { Cp2020Program } from './../../../cp2020-netrun-gear/models';
import { NrNodeType, NrMapDefaults } from './../../enums';
import { NrDatafort, Cp2020NrDatafort } from './../../models';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020DatafortBuilderService {
  private _datafort = new BehaviorSubject<Cp2020NrDatafort>(
    new Cp2020NrDatafort()
  );
  datafort = this._datafort.asObservable();

  private _currDatafort: Cp2020NrDatafort;

  selectedTool: NrNodeType;

  get maxSkills(): number {
    return 0;
  }

  constructor(private localStorageService: LocalStorageManagerService) {
    this.update(
      this.localStorageService.retrive<Cp2020NrDatafort>(
        StorageKeys.CP2020_NR_DATAFORT
      )
    );
  }

  isToolSelected(nodeType: NrNodeType): boolean {
    return this.selectedTool === nodeType;
  }

  update(datafort: NrDatafort) {
    if (datafort) {
      // validation on values
      datafort.rows = this.validateNumber(
        datafort.rows,
        NrMapDefaults.ROWS_MIN
      );
      datafort.columns = this.validateNumber(
        datafort.columns,
        NrMapDefaults.COLUMNS_MIN
      );
      datafort.cpu = this.validateNumber(
        datafort.cpu,
        NrMapDefaults.CPU_MIN,
        NrMapDefaults.CPU_MAX
      );
      datafort.datawallStr = this.validateNumber(
        datafort.datawallStr,
        datafort.cpu,
        NrMapDefaults.DATAWALL_STR_MAX
      );
      datafort.codegates = datafort?.codegates?.map((cg) => {
        return {
          str: this.validateNumber(
            cg.str,
            NrMapDefaults.CODEGATE_STR_MIN,
            NrMapDefaults.CODEGATE_STR_MAX
          ),
          coord: { x: cg.coord.x, y: cg.coord.y },
        };
      });
    }

    this._currDatafort = new Cp2020NrDatafort(datafort);
    this.calculateMemoryUsed();
    this.calculateCost();
    this._datafort.next(this._currDatafort);
    this.localStorageService.store<Cp2020NrDatafort>(
      StorageKeys.CP2020_NR_DATAFORT,
      this._currDatafort
    );
  }

  updateNode(x: number, y: number) {
    if (this.selectedTool === NrNodeType.DATAWALL) {
      this._currDatafort.datawallNodes.push({ x: x, y: y });
      this.update(this._currDatafort);
      return;
    }
    if (this.selectedTool === NrNodeType.CODEGATE) {
      this._currDatafort.codegates.push({ str: 2, coord: { x: x, y: y } });
      this.update(this._currDatafort);
      return;
    }
    if (this.selectedTool === NrNodeType.CPU) {
      this._currDatafort.cpuNodes.push({ x: x, y: y });
      this.update(this._currDatafort);
      return;
    }
    if (this.selectedTool === NrNodeType.MU) {
      this._currDatafort.muNodes.push({ x: x, y: y });
      this.update(this._currDatafort);
      return;
    }
    if (this.selectedTool === NrNodeType.PROGRAM) {
      this._currDatafort.defenses.push({
        name: '',
        program: new Cp2020Program(),
        coord: { x: x, y: y },
      });
      this.update(this._currDatafort);
      return;
    }
    if (
      this.selectedTool !== null &&
      this.selectedTool !== undefined &&
      this.selectedTool >= 0
    ) {
      this._currDatafort.remotes.push({
        name: '',
        type: this.selectedTool,
        coord: { x: x, y: y },
      });
      this.update(this._currDatafort);
      return;
    }
  }

  addSkill(skill: KeyValue<string, number>) {
    this._currDatafort.skills.push({ key: skill.key, value: skill.value });
    this.update(this._currDatafort);
  }

  removeSkill(index: number) {
    this._currDatafort.skills.splice(index, 1);
    this.update(this._currDatafort);
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

  removeRemote(coord: Coord) {
    this.removeNodeCoordFromList('remotes', coord);
  }

  removeRemoteByIndex(index: number) {
    this._currDatafort.remotes.splice(index, 1);
    this.update(this._currDatafort);
  }

  removeDefense(coord: Coord) {
    this.removeNodeCoordFromList('defenses', coord);
  }

  removeDefenseByIndex(index: number) {
    this._currDatafort.defenses.splice(index, 1);
    this.update(this._currDatafort);
  }

  removeSkillByIndex(index: number) {
    this._currDatafort.skills.splice(index, 1);
    this.update(this._currDatafort);
  }

  private removeNodeFromList(prop: string, x: number, y: number) {
    const index = this._currDatafort[prop]?.findIndex(
      (n) => n.x === x && n.y === y
    );
    if (index > -1) {
      this._currDatafort[prop].splice(index, 1);
      this.update(this._currDatafort);
    }
  }

  private removeNodeCoordFromList(prop: string, coord: Coord) {
    const index = this._currDatafort[prop]?.findIndex(
      (n) => n.coord.x === coord.x && n.coord.y === coord.y
    );
    if (index > -1) {
      this._currDatafort[prop].splice(index, 1);
      this.update(this._currDatafort);
    }
  }

  reset() {
    this.update(new Cp2020NrDatafort());
  }

  private calculateMemoryUsed() {
    const fileUsage = this._currDatafort.mu.reduce(
      (sum, mu) => sum + (isNaN(mu.value) ? 0 : mu.value),
      0
    );
    const programUsage = this._currDatafort.defenses.reduce(
      (sum, prog) => sum + prog.program.mu,
      0
    );
    this._currDatafort.muUsed = fileUsage + programUsage;
  }

  private calculateCost() {
    const cpuCost = this._currDatafort.cpu * NrMapDefaults.CPU_COST;
    const datawallCost =
      this._currDatafort.datawallStr > this._currDatafort.cpu
        ? (this._currDatafort.datawallStr - this._currDatafort.cpu) *
          NrMapDefaults.DATAWAL_COST
        : 0;
    const skillCost = this._currDatafort.skills.reduce(
      (sum, skill) => sum + this.calculateSkillCost(skill.value),
      0
    );
    let codegateCount = this._currDatafort.codegates.length;
    codegateCount =
      codegateCount > this._currDatafort.cpu
        ? codegateCount - this._currDatafort.cpu
        : 0;
    let codegateCost = codegateCount * NrMapDefaults.CODEGATE_COST;
    codegateCost += this._currDatafort.codegates
      .filter((cg) => cg.str > 2)
      .reduce((sum, cg) => sum + this.calcuateCodegateStrCost(cg.str), 0);
    const remotesCost =
      this._currDatafort.remotes.filter((r) => r.type === NrNodeType.TERMINAL)
        .length * NrMapDefaults.TERMINAL_COST;
    const defenseCost = this._currDatafort.defenses.reduce(
      (sum, def) => sum + def.program.cost,
      0
    );

    this._currDatafort.cost =
      cpuCost +
      datawallCost +
      skillCost +
      codegateCost +
      defenseCost +
      remotesCost +
      this._currDatafort.additionalCosts;
  }

  private calcuateCodegateStrCost(str: number): number {
    return str < 3 ? 0 : (str - 2) * NrMapDefaults.CODEGATE_STR_COST;
  }

  private calculateSkillCost(rank: number): number {
    if (rank < 5) {
      return NrMapDefaults.SKILL_BASE_COST;
    }
    return (
      NrMapDefaults.SKILL_BASE_COST +
      NrMapDefaults.SKILL_LEVEL_COST * (rank - 4)
    );
  }

  private validateNumber(value: number, min: number, max?: number): number {
    let result = value < min ? min : value;
    if (max != null) {
      result = result > max ? max : result;
    }
    return result;
  }
}
