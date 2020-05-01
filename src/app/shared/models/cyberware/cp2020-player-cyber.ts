import { DataCyberware } from './data-cyberware';
import { SourceBook } from './../sourcebook';
import { BaseCyberware } from './baseCyberware';

export class Cp2020PlayerCyber extends DataCyberware {
    hl: number;
    finalCost: number;

    constructor(params?) {
      super(params);
      this.hl = (params) ? params.hl : undefined;
      this.finalCost = (params) ? params.finalCost : undefined;
    }
}
