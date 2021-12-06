import { NrDatafortDefense } from './nr-datafort-defense';
import { NrDatafortRemote } from './nr-datafort-remote';
import { KeyValue } from '@angular/common';
import { Program } from './../../../cp2020/cp2020-netrun-gear/models';
import { Coord } from './../../../models/coord';
import { NrAI } from './nr-ai';
import { NrDatafortCodegate } from './nr-datafort-codegate';

export interface NrDatafort {
  name: string;
  notes: string;
  rows: number;
  columns: number;
  cost: number;
  additionalCosts: number;
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
  codegates: Array<NrDatafortCodegate>;
  files: Array<KeyValue<string,number>>;
  remotes: Array<NrDatafortRemote>;
  skills: Array<KeyValue<string,number>>;
  defenses: Array<NrDatafortDefense>;
}

