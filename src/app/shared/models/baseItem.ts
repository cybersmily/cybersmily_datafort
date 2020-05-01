import { SourceBook } from './sourcebook';
export interface BaseItem {
  name: string; // name of the item.
  cost?: number | string; // cost of the item in eb if number else string.
  source?: SourceBook; // what sourcebook contains the item.
  notes?: string; // game notes about the item
  desc?: string; // used for text description of item
}
