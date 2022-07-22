import { GangChartEntry } from './gang-chart-entry';
export class GangChart {
  type: Array<GangChartEntry>;
  age: Array<GangChartEntry>;
  memberAge: Array<GangChartEntry>;
  member: Array<GangChartEntry>;
  turf: Array<GangChartEntry>;
  expansion: Array<GangChartEntry>;

  constructor() {
    this.type = new Array<GangChartEntry>();
    this.age = new Array<GangChartEntry>();
    this.memberAge = new Array<GangChartEntry>();
    this.member = new Array<GangChartEntry>();
    this.turf = new Array<GangChartEntry>();
    this.expansion = new Array<GangChartEntry>();
  }
}
