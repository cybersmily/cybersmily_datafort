import { Cp2020Program } from './../../cp2020-netrun-gear/models/cp2020-program';
import { NrDatafortDefense } from './nr-datafort-defense';
import { NrDatafortRemote } from './nr-datafort-remote';
import { NrMapDefaults } from '../enums/nr-map-defaults';
import { KeyValue } from '@angular/common';
import { Coord } from './../../../models/coord';
import { NrDatafort } from "./nr-datafort";
import { NrDatafortCodegate } from './nr-datafort-codegate';
import { CB1 } from 'canvg';

export class Cp2020NrDatafort implements NrDatafort {
  name = '' ;
  rows =  NrMapDefaults.ROWS_DEFAULT;
  columns = NrMapDefaults.COLUMNS_DEFAULT;
  cost = 0;
  cpu = NrMapDefaults.CPU_MIN;
  cpuNodes = new Array<Coord>();
  mu = new Array<KeyValue<string,number>>();
  muNodes = new Array<Coord>();
  muAvailable = 40 * this.cpu;
  muUsed = 0;
  int = 3 * this.cpu;
  ai = {};
  datawallStr = NrMapDefaults.DATAWALL_STR_MIN;
  datawallNodes = new Array<Coord>();
  codegates = new Array<NrDatafortCodegate>();
  files = new Array<KeyValue<number,string>>();
  remotes = new Array<NrDatafortRemote>();
  skills = new Array<KeyValue<string,number>>();
  defenses = new Array<NrDatafortDefense>();

  constructor(param?: NrDatafort) {
    if(param) {
      this.name = param?.name ?? '' ;
      this.rows = param?.rows ?? NrMapDefaults.ROWS_DEFAULT;
      this.columns = param?.columns ?? NrMapDefaults.COLUMNS_DEFAULT;
      this.cost = param?.cost ?? 0;
      this.cpu = param?.cpu ?? NrMapDefaults.CPU_MIN;
      this.cpuNodes = param?.cpuNodes.map( n => {return {x: n.x, y: n.y};}) ?? new Array<Coord>();
      this.muAvailable = 40 * this.cpu;
      this.muUsed = param?.muUsed ?? 0;
      this.int = 3 * this.cpu;
      this.ai = param?.ai ?? {};
      this.datawallStr = param?.datawallStr ?? NrMapDefaults.DATAWALL_STR_MIN;
      this.datawallNodes = param?.datawallNodes.map( n => {return {x: n.x, y: n.y};}) ?? new Array<Coord>();
      this.codegates = param?.codegates.map( cg => {return{str: cg.str, coord: {x: cg.coord.x, y: cg.coord.y}};}) ?? new Array<NrDatafortCodegate>();
      // add in the MUs
      this.muNodes = param?.muNodes.map( n => {return {x: n.x, y: n.y};}) ?? new Array<Coord>();
      this.mu = param?.mu.map( mu => {return {key: mu.key, value: mu.value}}) ?? new Array<KeyValue<string, number>>(this.cpu * 4);
      this.mu = new Array<KeyValue<string,number>>(this.cpu * 4);
      // limit the number of items based on the size of either skill array
      for( let i = 0; i < this.mu.length; i++) {
        const mu = {key:  param.mu[i]?.key ?? '', value: param.mu[i]?.value ?? 0};
        this.mu[i] = mu;
      }

      // every 2 CPU, the datafort gets 5 skills.
      this.skills = new Array<KeyValue<string,number>>(Math.floor(this.cpu/2) * 5);
      // limit the number of items based on the size of either skill array
      for( let i = 0; i < this.skills.length; i++) {
        const skill = {key:  param.skills[i]?.key ?? '', value: param.skills[i]?.value ?? 4};
        this.skills[i] = skill;
      }

      this.files = new Array<KeyValue<number,string>>();
      this.remotes = new Array<NrDatafortRemote>();
      param?.remotes.forEach( remote => {
        this.remotes.push({name: remote.name, type: remote.type, coord: {x: remote.coord.x, y:remote.coord.y}});
      });
      this.defenses = new Array<NrDatafortDefense>();
      param?.defenses.forEach( defense => {
        this.defenses.push({name: defense.name, coord: {x: defense.coord.x, y: defense.coord.y}, program: new Cp2020Program(defense.program)});
      });
    }
  }
}
