import { SourceBook } from '../../../models/sourcebook';

export interface Gear {
  name: string;
  cost: string;
  desc: string;
  notes?: string;
  type?: string;
  flavor?: string;
  source?: SourceBook;
  img?: string;
  imgCredit?: string;
}
