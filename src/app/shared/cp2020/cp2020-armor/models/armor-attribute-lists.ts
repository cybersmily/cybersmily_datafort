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
