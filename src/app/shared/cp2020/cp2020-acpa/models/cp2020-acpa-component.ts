import { ACPAComponent } from ".";
import { ACPAEnclosure } from './../enums/acpa-enclossure';
import { SourceBook } from './../../../models/sourcebook';

export class Cp2020ACPAComponent implements ACPAComponent {
  category: string;
  name: string;
  weight: number;
  weightMod?: {component:string, mod:number}
  costMod?: {component:string, mod:number}

  spaces: number;
  cost: number;
  sp: number;
  sdp: number;
  internal?: string;
  external?: string;
  notes?: string;
  modifiers?: any;
  source: SourceBook;

  constructor(param?:ACPAComponent) {
    this.category = param?.category ?? '';
    this.name = param?.name ?? '';
    this.weight = param?.weight ?? 0;
    this.spaces = param?.spaces ?? 0;
    this.cost = param?.cost ?? 0;
    this.sp = param?.sp ?? 0;
    this.sdp = param?.sdp ?? 0;
    this.internal = param?.internal ?? null;
    this.external = param?.external ?? null;
    this.notes = param?.notes ?? '';
    this.modifiers = param?.modifiers ?? null;
    if(param?.weightMod){
      this.weightMod = {component:param.weightMod.component, mod:param.weightMod.mod}
    }
    if(param?.costMod){
      this.costMod = {component:param.costMod.component, mod:param.costMod.mod}
    }
    this.source = {
      book: param?.source?.book ?? '',
      page: param?.source?.page ?? 0
    };

  }
}
