import { SourceBook } from './../sourcebook';
export interface NrDeckOption {
  name: string;
  cost: number | string;
  slot?: number;
  slotType?: string;
  description: string;
  source: SourceBook;
  mods: any;
  count?: number;
}
