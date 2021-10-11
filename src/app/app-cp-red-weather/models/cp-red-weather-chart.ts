import { CpRedSeason } from './cp-red-season';
import { CpRedStrange } from './cp-red-strange';

export class CpRedWeatherChart {
  system: string;
  winter: CpRedSeason;
  spring: CpRedSeason;
  summer: CpRedSeason;
  aututm: CpRedSeason;
  strange: Array<CpRedStrange>;

  constructor() {
    this.system = '';
    this.winter = {tempatures: [], conditions: []};
    this.aututm = {tempatures: [], conditions: []};
    this.spring = {tempatures: [], conditions: []};
    this.summer = {tempatures: [], conditions: []};
    this.strange = new Array<CpRedStrange>();
  }
}
