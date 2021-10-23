import { ArmorOption } from "./armor-option";
import { PieceOfClothing } from "./piece-of-clothing";
import { ArmorSpChartEntry } from "./armor-sp-chart-entry";

export interface ArmorAttributeLists {
  clothes: Array<PieceOfClothing>;
  styles: Array<ArmorOption>;
  qualities: Array<ArmorOption>;
  armorChart: Array<ArmorSpChartEntry>;
  options: Array<ArmorOption>;
}


export class Cp2020ArmorAttributeLists implements ArmorAttributeLists {
  clothes = new Array<PieceOfClothing>();
  styles = new Array<ArmorOption>();
  qualities = new Array<ArmorOption>();
  armorChart = new Array<ArmorSpChartEntry>();
  options = new Array<ArmorOption>();

  constructor(param?: ArmorAttributeLists) {
    if(param) {
      this.clothes = param.clothes.map(item => item);
      this.styles = param.styles.map(item => item);
      this.qualities = param.qualities.map(item => item);
      this.armorChart = param.armorChart.map(item => item);
      this.options = param.options.map(item => item);
    }
  }
}
