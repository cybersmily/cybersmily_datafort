import { NrMapDefaults } from '../enums/nr-map-defaults';
import { KeyValue } from '@angular/common';
import { Program } from './../../../cp2020/cp2020-netrun-gear/models';
import { Coord } from './../../../models/coord';
import { NrDatafort } from "./nr-datafort";

export class Cp2020NrDatafort implements NrDatafort {
  name = '' ;
  rows =  NrMapDefaults.ROWS_DEFAULT;
  columns = NrMapDefaults.COLUMNS_DEFAULT;
  cost = 0;
  cpu = NrMapDefaults.CPU_MIN;
  cpuNodes = new Array<Coord>();
  mu = new Array<KeyValue<string,number>>();
  muNodes = new Array<Coord>();
  int = 3 * this.cpu;
  ai = {};
  datawallStr = NrMapDefaults.DATAWALL_STR_MIN;
  datawallNodes = new Array<Coord>();
  codegateStr = NrMapDefaults.CODEGATE_STR_MIN;

  codegateNodes = new Array<Coord>();
  files = new Array<KeyValue<number,string>>();
  vr = new Array<any>();
  remotes = new Array<KeyValue<string,string>>();
  skills = new Array<KeyValue<string,number>>();
  defenses = new Array<Program>();

  constructor(param?: NrDatafort) {
    if(param) {
      this.name = param?.name ?? '' ;
      this.rows = param?.rows ?? NrMapDefaults.ROWS_DEFAULT;
      this.columns = param?.columns ?? NrMapDefaults.COLUMNS_DEFAULT;
      this.cost = param?.cost ?? 0;
      this.cpu = param?.cpu ?? NrMapDefaults.CPU_MIN;
      this.cpuNodes = param?.cpuNodes.map( n => {return {x: n.x, y: n.y};}) ?? new Array<Coord>();
      this.int = 3 * this.cpu;
      this.ai = param?.ai ?? {};
      this.datawallStr = param?.datawallStr ?? NrMapDefaults.DATAWALL_STR_MIN;
      this.datawallNodes = param?.datawallNodes.map( n => {return {x: n.x, y: n.y};}) ?? new Array<Coord>();
      this.codegateStr = param?.codegateStr ?? NrMapDefaults.CODEGATE_STR_MIN;
      this.codegateNodes = param?.codegateNodes.map( n => {return {x: n.x, y: n.y};}) ?? new Array<Coord>();
      // add in the MUs
      this.mu = param?.mu.map( mu => {return {key: mu.key, value: mu.value}}) ?? new Array<KeyValue<string, number>>(this.cpu * 4);
      this.muNodes = param?.muNodes.map( n => {return {x: n.x, y: n.y};}) ?? new Array<Coord>();

      // every 2 CPU, the datafort gets 5 skills.
      this.skills = new Array<KeyValue<string,number>>(Math.floor(this.cpu/2) * 5);
      // limit the number of items based on the size of either skill array
      for( let i = 0; i < this.skills.length; i++) {
        const skill = {key:  param.skills[i]?.key ?? '', value: param.skills[i]?.value ?? 4};
        this.skills[i] = skill;
      }


      this.files = new Array<KeyValue<number,string>>();
      this.vr = new Array<any>();
      this.remotes = new Array<KeyValue<string,string>>();
      this.defenses = new Array<Program>();
    }
  }
}
