import { SourceBook } from './../../../models/sourcebook';
import { ACPAAmmo } from './acpa-ammo';
import { ACPAEnclosure } from './../enums/acpa-enclossure';
import { ACPAWeapon } from './acpa-weapon';
export class Cp2020ACPAWeapon implements ACPAWeapon {
  category:string;
  name: string;
  wa:number;
  damage:string;
  pen:number;
  shots: number;
  rof:number;
  range:number;
  space:number;
  weight: number;
  spaces: number;
  cost: number;
  sp: number;
  sdp: number;
  enclosed: ACPAEnclosure;
  internal?: string;
  external?: string;
  ammo?: ACPAAmmo;
  volley?:number;
  notes?:string;
  burst?: number;
  source: SourceBook;
  weightMod?: {component:string, mod:number}
  costMod?: {component:string, mod:number}

  constructor(param?:ACPAWeapon) {
    this.category = param?.category ?? '';
    this.name = param?.name ?? '';
    this.wa = param?.wa ?? null;
    this.damage = param?.damage ?? null;
    this.pen = param?.pen ?? null;
    this.shots = param?.shots ?? 0;
    this.rof = param?.rof ?? null;
    this.range = param?.range ?? null;
    this.space = param?.space ?? 0;
    this.weight = param?.weight ?? 0;
    this.spaces = param?.spaces ?? 0;
    this.cost = param?.cost ?? 0;
    this.sp = param?.sp ?? 0;
    this.sdp = param?.sdp ?? 0;
    this.internal = param?.internal ?? null;
    this.external = param?.external ?? null;
    this.enclosed = param?.enclosed ?? ACPAEnclosure.internal;
    this.ammo = param?.ammo ?? null;
    this.volley = param?.volley ?? null;
    this.notes = param?.notes ?? '';
    this.burst = param?.burst ?? null;
    this.source = {
      book: param?.source?.book ?? '',
      page: param?.source?.page ?? 0
    };
    if(param?.weightMod){
      this.weightMod = {component:param.weightMod.component, mod:param.weightMod.mod}
    }
    if(param?.costMod){
      this.costMod = {component:param.costMod.component, mod:param.costMod.mod}
    }

  }
}
