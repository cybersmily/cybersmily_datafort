import { NRRegionMap } from './nr-region-map';

export interface LoadedMap {
  fileName: string;
  mapObj: NRRegionMap;
  mapGrid: Array<any>;
}
