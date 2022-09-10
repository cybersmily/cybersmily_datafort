import { Cp2020Contact } from './cp2020-contact';
export class Cp2020PlayerContact implements Cp2020Contact {
  name: string;
  location: string;
  notes: string;
  occupation: string;
  relation: string;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.location = param?.location ?? '';
    this.notes = param?.notes ?? '';
    this.occupation = param?.occupation ?? '';
    this.relation = param?.relation ?? '';
  }
}
