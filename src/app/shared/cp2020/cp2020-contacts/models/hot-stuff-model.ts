import { HotStuffArea } from './hot-stuff-area';

export class HotStuffModel {
  areas: Array<HotStuffArea>;
  streetdeal: number;

  constructor() {
    this.areas = new Array<HotStuffArea>();
    this.streetdeal = 0;
  }
}
