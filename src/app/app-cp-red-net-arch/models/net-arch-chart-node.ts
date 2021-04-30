export interface NetArchChartNode {
  type: string;
  name: string;
  desc: string;
  cost: number;
  dv?: number;
  programs?:Array<string>;
}
