import { SourceBook } from './../../../models/sourcebook';
import { BaseCyberware } from './baseCyberware';

export class DataCyberware implements BaseCyberware {
  type: string;
  subtype: string;
  name: string;
  notes: string; // game notes of the item.
  cost: number;
  hc: string;
  surgery: string;
  source: SourceBook;
  abbrev: string;
  numOptions: number;
  desc?: string; // flavor text of the item.

  constructor(param?) {
    this.type = param?.type ?? '';
    this.subtype = param?.subtype ?? '';
    this.name = param?.cyber ?? param?.name ?? '';
    this.notes =  param?.notes ?? '';
    this.cost = (param) ? ((typeof param.cost === 'string') ? Number(param.cost) : param.cost) : 0;
    this.hc = param?.hc ?? '';
    this.surgery = param?.surgery ?? '';
    this.abbrev = param?.abbrev ?? '';
    this.source =  param?.source ?? {book: '', page: 0};
    this.desc = param?.desc ?? '';
    this.numOptions = param?.numOptions ?? 0;
  }
}
