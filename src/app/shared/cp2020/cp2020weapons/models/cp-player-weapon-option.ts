import { SourceBook } from './../../../models/sourcebook';
export class CpPlayerWeaponOption {
  type:string;
  name:string;
  notes:string;
  cost?:number;
  costMultiplier?:number;
  count?:number;
  totalCost: number;
  costPerRd?:number;
  shotsMod?: number;
  source:SourceBook;

  constructor(param?: any) {
    this.type = param?param.type: '';
    this.name = param?param.name: '';
    this.notes = param?param.notes: '';
    this.totalCost = param?param.totalCost: 0;
    this.cost = param?param.cost: undefined;
    this.costPerRd = param?param.costPerRd: undefined;
    this.costMultiplier = param?param.costMultiplier: undefined;
    this.count = param?param.count: 0;
    this.shotsMod = param?param.shotsMod: undefined;
    this.source = param?param.source: {book: ''};
  }

}
