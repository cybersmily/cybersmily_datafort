import { SourceBook } from './../../../models/sourcebook';

export interface VehicleOption {
  type: string;
  name: string;
  spaces: string;
  calcSpaces?: number;
  cost: string | number;
  calcCost?: number;
  mass?: string;
  avail?: string;
  source?: SourceBook;
  notes?: string;
  count?: number;
}
