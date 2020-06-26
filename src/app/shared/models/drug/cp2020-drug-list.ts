import { CpDrug } from './cp-drug';
import { Cp2020Drug } from './cp2020-drug';

export class Cp2020DrugList {
  private _drugList: Array<Cp2020Drug> = new Array<Cp2020Drug>();

  constructor(items?: Array<CpDrug>) {
    if (items && Array.isArray(items)) {
      items.forEach( d => this._drugList.push( new Cp2020Drug(d)));
    }
  }

  get totalCost(): number {
    return this._drugList.reduce( (a, b) => a + b.cost, 0);
  }

  get items(): Array<Cp2020Drug> {
    return this._drugList;
  }

  add(drug: Cp2020Drug) {
    this._drugList.push(drug);
    this._drugList.sort( (a, b) => a.name > b.name ? 1 : -1);
  }

  remove(index: number) {
    this._drugList.splice(index, 1);
  }

  update(drug: Cp2020Drug) {}
}
