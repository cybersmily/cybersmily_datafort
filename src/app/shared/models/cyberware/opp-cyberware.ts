import { SourceBook } from './../sourcebook';
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
    this.notes =  (param) ? param.notes : '';
    this.cost = (param) ? ((typeof param.cost === 'string') ? param.cost : Number(param.cost)) : 0;
    this.hc = (param) ? param.hc : '';
    this.surgery = (param) ? param.surgery : '';
    this.options = (param) ? param.options : undefined;
    this.armor = (param) ? param.armor : undefined;
  }
}
