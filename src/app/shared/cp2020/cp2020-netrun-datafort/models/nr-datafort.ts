import { NrDatafortDefense } from './nr-datafort-defense';
import { NrDatafortRemote } from './nr-datafort-remote';
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
  mu: Array<KeyValue<string,number>>;
  muNodes: Array<Coord>;
  muAvailable: number;
  muUsed: number;
  int: number;
  ai: NrAI;
  datawallStr: number;
  datawallNodes: Array<Coord>;
  codegateStr: number;
  codegateNodes: Array<Coord>;
  files: Array<KeyValue<number,string>>;
  remotes: Array<NrDatafortRemote>;
  skills: Array<KeyValue<string,number>>;
  defenses: Array<NrDatafortDefense>;
}

