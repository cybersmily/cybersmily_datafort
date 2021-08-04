import { SourceBook } from '../../../models/sourcebook';
export interface Cp2020Ammo {
  type: string;
  cost: number;
  perBox: number;
  source?: SourceBook;
  count?: number;
  subtype?: string;
  hasTypes?: boolean;
  notes?: string;
}
