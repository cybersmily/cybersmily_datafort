import { ArmorLayer } from './armor-layer';

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
  cost?: number;

  constructor(param?: any) {
    this.name = (param && param.name) ? param.name : '';
    this.head = (param && param.head) ? param.head : 0;
    this.torso = (param && param.torso) ? param.torso : 0;
    this.rarm = (param && param.arms) ? param.arms : (param && param.rarm) ? param.rarm : 0;
    this.larm = (param && param.arms) ? param.arms : (param && param.larm) ? param.larm : 0;
    this.rleg = (param && param.legs) ? param.legs : (param && param.rleg) ? param.rleg : 0;
    this.lleg = (param && param.legs) ? param.legs : (param && param.lleg) ? param.lleg : 0;
    this.isHard = (param && param.isHard) ? param.isHard : false;
    this.isActive = (param && param.isActive) ? param.isActive : false;
    this.ev = (param && param.ev) ? param.ev : 0;
    this.isSkinWeave = (param && param.isSkinWeave) ? param.isSkinWeave : false;
    this.cost = (param && param.cost) ? param.cost : 0;
  }
}
