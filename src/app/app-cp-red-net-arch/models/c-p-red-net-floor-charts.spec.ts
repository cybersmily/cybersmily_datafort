import { CPRedNetFloorCharts, CPRedNetFloorChartEntry } from './c-p-red-net-floor-charts';

describe('CPRedNetFloorCharts', () => {
  it('should create an instance', () => {
    expect(new CPRedNetFloorCharts()).toBeTruthy();
  });

  it('should create an entry instance', () => {
    expect(new CPRedNetFloorChartEntry()).toBeTruthy();
  });

  it('should create an entry instance from param', () => {
    const param = {
    name:  '',
    type: '',
    dv: 0,
    cost: 0,
    desc: ''
    };
    expect(new CPRedNetFloorChartEntry(param)).toBeTruthy();
  });
});
