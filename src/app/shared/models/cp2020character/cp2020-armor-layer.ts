import { ArmorLayer } from './../armor/armor-layer';

export class Cp2020ArmorLayer  implements ArmorLayer {
  name: string;
  head: number;
  torso: number;
  rarm: number;
  larm: number;
  rleg: number;
  lleg: number;
  isHard: boolean;
  isActive: boolean;
  ev: number;
  isSkinWeave: boolean;

  constructor() {
    this.name = '';
    this.head = 0;
    this.torso = 0;
    this.rarm = 0;
    this.larm = 0;
    this.rleg = 0;
    this.lleg = 0;
    this.isHard = false;
    this.isActive = false;
    this.ev = 0;
    this.isSkinWeave = false;
  }
}
