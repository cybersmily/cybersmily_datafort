import { SourceBook } from '../../../models/sourcebook';

export interface Cp2020Equipment {
  category:string;
  name: string;
  notes:string;
  cost: number|string;
  source: SourceBook
}
