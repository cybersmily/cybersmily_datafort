import { NrNodeType } from './../enums/nr-node-type';
import { Coord } from './../../../models/coord';
export interface NrDatafortRemote {
  name: string;
  type: NrNodeType;
  coord: Coord;
}
