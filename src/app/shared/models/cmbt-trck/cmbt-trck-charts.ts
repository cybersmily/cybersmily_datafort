import { CmbtTrckChartEntry } from '.';
export class CmbtTrckCharts {
  weapon: CmbtTrckChartEntry;
  armor:  CmbtTrckChartEntry;
  cyberware: CmbtTrckChartEntry;

  constructor() {
    this.weapon = {chart: [], values: []};
    this.armor = {chart: [], values: []};
    this.cyberware = {chart: [], values: []};
  }
}
