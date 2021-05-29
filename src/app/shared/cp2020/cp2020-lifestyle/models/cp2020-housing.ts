import { Cp2020Services } from "./cp2020-services";

export interface Cp2020Housing {
  name: string;
  quality: string;
  desc: string;
  contents: Array<string>;
  utilities: Array<Cp2020Services>;
  location: string;
  qualityMod: number;
  rooms: number;
  count: number;
  cost: number;
}
