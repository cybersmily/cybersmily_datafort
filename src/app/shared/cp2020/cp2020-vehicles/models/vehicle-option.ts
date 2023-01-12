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

export class Cp2020VehicleOption {
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

  constructor(param?: any) {
    this.type = param?.type ?? '';
    this.name = param?.name ?? '';
    this.spaces= param?.spaces ?? '';
    this.calcSpaces = param?.calcSpaces ?? 0;
    this.cost= param?.cost ?? '';
    this.calcCost = param?.calcCost ?? 0;
    this.mass = param?.mass ?? '';
    this.avail= param?.avail ?? '';
    this.source =param?.source ?? {book: '', page: 0};
    this.notes= param?.notes ?? '';
    this.count = param?.count ?? 1;
  }
}
