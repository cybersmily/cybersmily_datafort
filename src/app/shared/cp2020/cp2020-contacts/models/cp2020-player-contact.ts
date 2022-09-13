import { Cp2020Contact } from './cp2020-contact';
export class Cp2020PlayerContact implements Cp2020Contact {
  name: string;
  description: string;
  notes: string;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.description = param?.description ?? '';
    this.notes = param?.notes ?? '';
  }
}
