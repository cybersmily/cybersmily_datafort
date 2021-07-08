export interface FixerCharts {
  fields: Array<ChartItem>;
  types: Array<ChartItem>;
}

export interface ChartItem {
  value: string;
  weight: number;
}
