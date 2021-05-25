import { Cp2020Utility } from "./cp2020-utility";

export interface Cp2020Housing {
  name: string;
  quality: string;
  desc: string;
  contents: Array<string>;
  utilities: Array<Cp2020Utility>;
  location: string;
  qualityMod: number;
  rooms: number;
  count: number;
  cost: number;
}
