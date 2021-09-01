import { NetArchProgram } from "./net-arch-program";

export class CPRedNetFloorChartEntry {
  name: string;
  type: string;
  dv: number;
  cost: number;
  desc: string;
  programs?: Array<NetArchProgram>;

  constructor(param?:any){
    this.name = param?.name ?? '';
    this.type = param?.type ?? '';
    this.dv = param?.dv ?? 0;
    this.cost = param?.cost ?? 0;
    this.desc = param?.desc ?? '';
    this.programs = param?.programs ?? undefined;
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

