import { CpHousing } from './cp-housing';
import { Cp2020Services } from './cp2020-services';
export class Cp2020Housing implements CpHousing {
  name: string;
  quality: string;
  desc: string;
  contents: Array<string>;
  utilities: Array<Cp2020Services>;
  location: string;
  qualityMod: number;
  rooms: number;
  owns: boolean;
  mortgage: number;
  count: number;
  cost: number;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.quality = param?.quality ?? '';
    this.desc = param?.desc ?? '';
    this.contents = param?.contents ?? new Array<string>();
    this.utilities = param?.utilities ?? new Array<Cp2020Services>();
    this.location = param?.location ?? '';
    this.qualityMod = param?.qualityMod ?? 1;
    this.owns = param?.owns ?? false;
    this.rooms = param?.rooms ?? 1;
    this.count = param?.count ?? 1;
    this.cost = param?.cost ?? 0;
    this.mortgage = param?.mortgage ?? 0;
  }

  get totalCost(): number {
    let cost = (this.owns) ? this.mortgage : this.rooms * this.cost * this.qualityMod;
    cost += this.utilityCosts;
    return cost * this.count;
  }

  get costPerUnit(): number {
    let cost = this.rooms * this.cost * this.qualityMod;
    cost += this.utilityCosts;
    return cost;
  }

  get utilityCosts() : number {
    return this.utilities.reduce((a,b)=>a + (b.cost * b.count), 0);
  }
}
