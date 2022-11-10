import { SourceBook } from '../../../models/sourcebook';

export interface Cp2020Gear {
  category: string;
  name: string;
  notes: string;
  cost: number;
  wt: number;
  source: SourceBook;
}
