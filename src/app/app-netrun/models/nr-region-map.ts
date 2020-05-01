import { NRMapRow } from './nr-map-row';
import { NRMap } from './nr-map';

export class NRRegionMap extends NRMap {
  map: NRMapRow[];

  constructor() {
    super();
    this.map = [];
  }

  initializeMap(map: NRMap) {
    this.name = map.name;
    this.type = map.type;
    this.img = map.img;
    this.w = map.w;
    this.h = map.h;
    this.nx = map.nx;
    this.ny = map.ny;
    this.gridsize = map.gridsize;
    this.offsetx = map.offsetx;
    this.offsety = map.offsety;
    this.lx = map.lx;
    this.ly = map.ly;
    this.dforts = map.dforts;

    this.map = new Array<NRMapRow>();
  }
}
