import { ArmorPiece } from './../../models/armor-piece';
import { Injectable } from '@angular/core';
import { ArmorSpChartEntry } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ArmorCostCalculatorService {

  constructor() { }

  calculateCost(armor: ArmorPiece, spChart: Array<ArmorSpChartEntry>): number {
    const price = Number(armor.clothes.cost);
    let mod = 1;
    if (armor.isLeather) {
      const leather: number = Number(armor.clothes.leather);
      mod = isNaN(leather) ? mod : (mod * leather);
    }
    if (armor.options.length > 0) {
      // process which optionsn are chosen and add them up
      armor.options.forEach(
        opt => {
          if (typeof opt.mod === 'object' && opt.mod.hasOwnProperty(armor.clothes.wt)) {
            const optMod = opt.mod[armor.clothes.wt];
            mod = mod * optMod;
          } else if (typeof opt.mod === 'number'){
            mod = mod * Number(opt.mod);
          }
        }
      );
    }
    const style: number = Number(armor.style?.mod);
    if (!isNaN(style) && style > 0) {
      mod = mod * style;
    }
    const quality: number = Number(armor.quality?.mod);
    if (!isNaN(quality) && quality > 0) {
      mod = mod * quality;
    }
    // get the sp
    const sp = spChart.filter(entry => entry.sp === armor.baseSP)[0];
    if (sp) {
      mod = mod * (sp.mod[armor.clothes.wt] ?? 1);
    }

    return Math.ceil(mod * price);
  }
}
