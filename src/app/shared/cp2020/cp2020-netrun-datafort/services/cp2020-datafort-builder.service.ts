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

  private _currDatafort = new Cp2020NrDatafort();

  selectedTool: NrNodeType;

  constructor() { }

  isToolSelected(nodeType: NrNodeType ): boolean {
    return this.selectedTool === nodeType;
  }


  update(datafort: NrDatafort) {
    // validation on values
    datafort.rows = this.validateNumber(datafort.rows, NrMapDefaults.ROWS_MIN);
    datafort.columns = this.validateNumber(datafort.columns, NrMapDefaults.COLUMNS_MIN);
    datafort.cpu = this.validateNumber(datafort.cpu, NrMapDefaults.CPU_MIN, NrMapDefaults.CPU_MAX);
    datafort.datawallStr = this.validateNumber(datafort.datawallStr, NrMapDefaults.DATAWALL_STR_MIN, NrMapDefaults.DATAWALL_STR_MAX);
    datafort.codegateStr = this.validateNumber(datafort.codegateStr, NrMapDefaults.CODEGATE_STR_MIN, NrMapDefaults.CODEGATE_STR_MAX);

    this._currDatafort = new Cp2020NrDatafort(datafort);
    this._datafort.next(this._currDatafort);
  }

  updateNode(x: number, y: number) {
    if(this.selectedTool === NrNodeType.DATAWALL) {
      this._currDatafort.datawallNodes.push({x: x, y: y});
      this._datafort.next(this._currDatafort);
      return;
    }
    if(this.selectedTool === NrNodeType.CODEGATE) {
      this._currDatafort.codegateNodes.push({x: x, y: y});
      this._datafort.next(this._currDatafort);
      return;
    }
    if(this.selectedTool === NrNodeType.CPU) {
      this._currDatafort.cpuNodes.push({x: x, y: y});
      this._datafort.next(this._currDatafort);
      return;
    }
    if(this.selectedTool === NrNodeType.MU){
      this._currDatafort.muNodes.push({x: x, y: y});
      this._datafort.next(this._currDatafort);
      return;
    }
  }
  private validateNumber(value:number, min:number, max?:number ): number {
    let result = value < min ? min : value;
    if (max != null ) {
      result = result > max ? max : result;
    }
    return result;

  }
}
