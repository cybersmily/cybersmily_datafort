import { SourceBook } from './../../../models/sourcebook';
export class Cp2020PlayerAmmo {
  name: string;
  subtype: string;
  cost: number;
  rounds: number;
  perBox: number;
  notes: string;

  constructor(){
    this.name = '';
    this.subtype = '';
    this.cost = 0;
    this.rounds = 0;
    this.notes = '';
  }
}
