import { GangChartEntry } from './gang-chart-entry';
export class GangChart {
  type: Array<GangChartEntry>;
  age: Array<GangChartEntry>;
  memberAge: Array<GangChartEntry>;
  member: Array<GangChartEntry>;
  turf: Array<GangChartEntry>;
  expansion: Array<GangChartEntry>;
  naming: {
    adjectives: Array<string>;
    objects: Array<string>;
    units: Array<string>;
  };

  constructor() {
    this.type = new Array<GangChartEntry>();
    this.age = new Array<GangChartEntry>();
    this.memberAge = new Array<GangChartEntry>();
    this.member = new Array<GangChartEntry>();
    this.turf = new Array<GangChartEntry>();
    this.expansion = new Array<GangChartEntry>();
    this.naming = {
      adjectives: new Array<string>(),
      objects: new Array<string>(),
      units: new Array<string>(),
    };
  }
}
