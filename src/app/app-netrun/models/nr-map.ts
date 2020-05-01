import { NRDataFort } from '../models/nr-data-fort';

export class NRMap {
  name: string;
  type: string;
  img: string;
  w: number;
  h: number;
  nx: number;
  ny: number;
  gridsize: number;
  offsetx: number;
  offsety: number;
  lx: number;
  ly: number;
  dforts?: NRDataFort[];

  constructor() {
    this.name = '';
    this.type = '';
    this.img = '';
    this.w = 0;
    this.h = 0;
    this.nx = 0;
    this.ny = 0;
    this.gridsize = 0;
    this.offsetx = 0;
    this.offsety = 0;
    this.lx = 0;
    this.ly = 0;
    this.dforts = [];
  }
}
