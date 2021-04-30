import { NetArchProgram } from "./net-arch-program";

export class CPRedNetFloorChartEntry {
  name: string;
  type: string;
  dv: number;
  cost: number;
  desc: string;
  programs?: Array<NetArchProgram>;

  constructor(param?:any){
    this.name = (param && param.name)? param.name : '';
    this.type = (param && param.type)? param.type : '';
    this.dv = (param && param.dv)? param.dv : 0;
    this.cost = (param && param.cost)? param.cost : 0;
    this.desc = (param && param.desc)? param.desc : '';
    this.programs = (param)? param.programs : undefined;
  }
}

export class CPRedNetFloorCharts {

  lobby: Array<CPRedNetFloorChartEntry>;
  floors: Array<Array<CPRedNetFloorChartEntry>>;

  constructor() {
    this.lobby = new Array<CPRedNetFloorChartEntry>();
    this.floors = new Array<Array<CPRedNetFloorChartEntry>>();
  }

}

