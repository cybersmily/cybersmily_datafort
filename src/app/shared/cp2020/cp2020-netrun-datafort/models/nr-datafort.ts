import { KeyValue } from '@angular/common';
import { Program } from './../../../cp2020/cp2020-netrun-gear/models';
import { Coord } from './../../../models/coord';
import { NrAI } from './nr-ai';

export interface NrDatafort {
  name: string;
  rows: number;
  columns: number;
  cost: number;
  cpu: number;
  cpuNodes: Array<Coord>;
  int: number;
  ai: NrAI;
  datawallStr: number;
  datawallNodes: Array<Coord>;
  codegateStr: number;
  codegateNodes: Array<Coord>;
  files: Array<KeyValue<number,string>>;
  vr: Array<any>;
  remotes: Array<KeyValue<string,string>>;
  skills: Array<KeyValue<string,number>>;
  defenses: Array<Program>;
}

