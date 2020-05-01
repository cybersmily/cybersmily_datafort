import { SourceBook } from './../sourcebook';
import { BaseCyberware } from './baseCyberware';

export class DataCyberware implements BaseCyberware {
  type: string;
  subtype: string;
  name: string;
  notes: string; // game notes of the item.
  cost: string | number;
  hc: string;
  surgery: string;
  source: SourceBook;
  desc?: string; // flavor text of the item.

  constructor(param?) {
    this.type = (param) ? param.type : '';
    this.subtype = (param) ? param.subtype : '';
    this.name = (param) ? (param.cyber ? param.cyber : ((param.name) ? param.name : '')) : '';
    this.notes =  (param) ? param.notes : '';
    this.cost = (param) ? ((typeof param.cost === 'string') ? param.cost : Number(param.cost)) : 0;
    this.hc = (param) ? param.hc : '';
    this.surgery = (param) ? param.surgery : '';
    this.source =  (param) ? param.source : {book: '', page: 0};
    this.desc = (param) ? param.desc : '';
  }
}
