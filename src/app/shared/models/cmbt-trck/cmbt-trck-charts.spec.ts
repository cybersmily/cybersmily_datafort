import { CmbtTrckCharts } from './cmbt-trck-charts';
import { TestBed } from '@angular/core/testing';

describe('CmbtTrckCharts', () => {
  it('should create', () => {
    const ctChart = new CmbtTrckCharts();
    expect(ctChart).toBeTruthy();
    expect(ctChart.weapon).toBeTruthy();
    expect(ctChart.armor).toBeTruthy();
    expect(ctChart.cyberware).toBeTruthy();
  });
});
