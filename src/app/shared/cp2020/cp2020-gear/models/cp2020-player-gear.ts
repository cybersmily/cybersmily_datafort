import { v4 as uuidv4 } from 'uuid';

export class Cp2020PlayerGear {
  gear: string;
  weight: number;
  location?: string;
  id?: string;
  cost: number;
  notes?: string;

  constructor(para?: any) {
    this.gear = para?.gear ?? para?.name ?? '';
    this.weight = para?.weight ?? para?.wt ?? 0;
    this.location = para?.location ?? '';
    this.id = para?.id ?? uuidv4();
    this.cost = para?.cost ?? 0;
    this.notes = para?.notes ?? '';
  }
}
