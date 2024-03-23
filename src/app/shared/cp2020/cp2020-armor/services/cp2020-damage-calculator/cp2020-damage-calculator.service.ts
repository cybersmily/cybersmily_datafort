import { Cp2020AmmoTypes } from './../../enums/cp2020-ammo-types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020DamageCalculatorService {

  constructor() { }

  getWounds(damage: number, damageType: Cp2020AmmoTypes, location: string, sp: number, isHard: boolean) : number {
    let result = 0;
    switch(damageType) {
      case Cp2020AmmoTypes.AP_ROUND:
        result = (damage - Math.ceil(sp/2))/2;
        break;
      case Cp2020AmmoTypes.DP_ROUND:
        if( sp < 1) {
          result = damage * 1.5;
        } else {
          result = damage - Math.ceil(sp/2);
        }
        break;
      case Cp2020AmmoTypes.API_ROUND:
        result = (damage - Math.ceil(sp/2))/2;
        break;
      case Cp2020AmmoTypes.HOLLOWPOINT_ROUND:
        result = (damage - (sp * 2)) * 1.5;
        break;
      case Cp2020AmmoTypes.SAFETY_ROUND:
        if( sp < 11) {
          result = (damage - (sp * 2)) * 3;
        } else {
          result = 0;
        }
        break;
      case Cp2020AmmoTypes.FLECHETTE_ROUND:
        result = damage - Math.ceil(sp/2);
        break;
      case Cp2020AmmoTypes.SLUG_SHELL:
        result = damage - Math.ceil(sp/2);
        break;
      case Cp2020AmmoTypes.FLECHETTE_SHELL:
        result = (damage - Math.ceil(sp/4))/4;
        break;
      case Cp2020AmmoTypes.MONOBLADE:
        if(isHard){
          result = damage - Math.ceil(sp * 0.66);
        } else {
          result = damage - Math.ceil(sp * 0.33);
        }
        break;
      case Cp2020AmmoTypes.KNIFE_AP:
        result = damage - Math.ceil(sp/2);
        break;
      case Cp2020AmmoTypes.BROADHEAD:
        result = (damage - Math.ceil(sp/2)) * 2;
        break;
      case Cp2020AmmoTypes.SPINNERHEAD:
        result = (damage - Math.ceil(sp/2)) * 3;
        break;
      case Cp2020AmmoTypes.IGNORE_ARMOR:
        result = damage;
        break;
      case Cp2020AmmoTypes.HEP:
        result = damage;
        break;
      case Cp2020AmmoTypes.HEAVY_FLECHETTE_ROUND:
        result = damage - Math.ceil(sp/4);
        break;
      default:
        result = damage - sp;
    }
    if(location === 'head') {
      result = result * 2;
    }
    return result < 0 ? 0 : Math.ceil(result);
  }
}
