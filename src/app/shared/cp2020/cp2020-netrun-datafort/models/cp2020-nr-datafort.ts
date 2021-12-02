import { KeyValue } from '@angular/common';
import { Program } from './../../../cp2020/cp2020-netrun-gear/models';
import { Coord } from './../../../models/coord';
import { NrDatafort } from "./nr-datafort";

export class Cp2020NrDatafort implements NrDatafort {
  name = '' ;
  rows = 20;
  columns = 20;
  cost = 0;
  cpu = 1;
  ai = {};
  datawallStr = 1;
  datawallNodes = new Array<Coord>();
  codegateStr = 2;
  codegateNodes = new Array<Coord>();
  files = new Array<KeyValue<number,string>>();
  vr = new Array<any>();
  remotes = new Array<KeyValue<string,string>>();
  skills = new Array<KeyValue<string,number>>();
  defenses = new Array<Program>();

  constructor(param?: NrDatafort) {
    if(param) {
      this.name = param?.name ?? '' ;
      this.rows = param?.rows ?? 20;
      this.columns = param?.columns ?? 20;
      this.cost = param?.cost ?? 0;
      this.cpu = param?.cpu ?? 1;
      this.ai = param?.ai ?? {};
      this.datawallStr = param?.datawallStr ?? 1;
      this.datawallNodes = param?.datawallNodes.map( n => {return {x: n.x, y: n.y};}) ?? new Array<Coord>();
      this.codegateStr = param?.codegateStr ?? 1;;
      this.codegateNodes = param?.codegateNodes.map( n => {return {x: n.x, y: n.y};}) ?? new Array<Coord>();
      this.skills = param?.skills.map( skill => {return {key: skill.key, value: skill.value};}) ?? new Array<KeyValue<string,number>>();

      this.files = new Array<KeyValue<number,string>>();
      this.vr = new Array<any>();
      this.remotes = new Array<KeyValue<string,string>>();
      this.defenses = new Array<Program>();
    }
  }
}
