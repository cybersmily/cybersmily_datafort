import { BaseCyberware } from './baseCyberware';
export class OppCyberware implements BaseCyberware {
  name: string;
  abbrev: string;
  notes: string; // game notes of the item.
  cost: string | number;
  hc: string;
  surgery: string;
  options?: string;
  armor?: any;

  constructor(param?) {
    this.name = (param) ? (param.cyber ? param.cyber : ((param.name) ? param.name : '')) : '';
    this.notes =  param?.notes ?? '';
    this.cost = ((typeof param?.cost === 'string') ? param.cost : Number(param.cost)) ?? 0;
    this.hc = param?.hc ?? '';
    this.surgery = (param) ? param.surgery : '';
    if(Array.isArray(param?.options) ) {
      this.options = (param.options as Array<any>).map( opt => opt?.name).join(', ');
    } else {
      this.options = param?.options ?? undefined;
    }
    this.armor = param?.armor ?? undefined;
  }
}
