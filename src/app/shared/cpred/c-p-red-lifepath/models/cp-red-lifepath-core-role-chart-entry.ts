import {CpRedLifepathCoreRoleChartItem} from './cp-red-lifepath-core-role-chart-item';
import { CpRedLifepathCoreRoleChartParam } from './cp-red-lifepath-core-role-chart-param';

export interface CpRedLifepathCoreRoleChartEntry {
  role: string;
  charts: Array<string>;
  param?: Array<CpRedLifepathCoreRoleChartParam>;
  type: CpRedLifepathCoreRoleChartItem;
}
