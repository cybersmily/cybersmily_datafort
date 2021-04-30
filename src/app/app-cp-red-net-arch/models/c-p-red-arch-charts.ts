import { NetArchChartNode } from './net-arch-chart-node';
import { CPRedDemon } from "./c-p-red-demon";
import { NetArchProgram } from "./net-arch-program";

export interface CPRedArchCharts {
  programs: Array<NetArchProgram>;
  lobby: Array<NetArchChartNode>;
  floors: Array<Array<NetArchChartNode>>;
  demons: Array<CPRedDemon>;
  demonCharts: Array<Array<string>>;
}
